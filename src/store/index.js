import { createStore } from "vuex";
import { fetchAllRecords } from "@/services/airtable";
import CONSTANTS from "@/constants";

const store = createStore({
  state: {
    appointments: [],
    filteredAppointments: [],
    agents: [],
    agentColorMap: {},
    agentFilter: [],
    activeStatus: "All Statuses",
    count: 0,
    earliestDateFilter: "",
    latestDateFilter: "",
  },
  mutations: {
    setAppointments(state, appointments) {
      state.appointments = appointments;
      state.filteredAppointments = appointments;
    },
    setAgents(state, agents) {
      state.agents = agents;
    },
    setAgentColorMap(state, agentColorMap) {
      state.agentColorMap = agentColorMap;
    },
    setAgentFilter(state, agentFilter) {
      state.agentFilter = agentFilter;
    },
    filterAppointments(state) {
      state.filteredAppointments = [...state.appointments];
      //Filter by status
      switch (state.activeStatus) {
        case "Cancelled":
          state.filteredAppointments = JSON.parse(
            JSON.stringify([...state.filteredAppointments])
          ).filter((x) => x.fields?.is_cancelled == true);
          break;
        case "Upcoming":
          state.filteredAppointments = JSON.parse(
            JSON.stringify([...state.filteredAppointments])
          ).filter(
            (x) =>
              getTimeDiff(x.fields?.appointment_date) !== "completed" &&
              x.fields?.is_cancelled !== true
          );
          break;
        case "Completed":
          state.filteredAppointments = JSON.parse(
            JSON.stringify([...state.filteredAppointments])
          ).filter(
            (x) =>
              getTimeDiff(x.fields?.appointment_date) == "completed" &&
              x.fields?.is_cancelled !== true
          );
          break;
        default:
          state.filteredAppointments = JSON.parse(
            JSON.stringify([...state.filteredAppointments])
          );
      }
      // Filter by date
      state.filteredAppointments = JSON.parse(
        JSON.stringify([...state.filteredAppointments])
      ).filter(
        (x) =>
          isAppointmentWithinRange(
            state.earliestDateFilter,
            state.latestDateFilter,
            x
          ) === true
      );
    },
    changeStatus(state, status) {
      state.activeStatus = status;
      this.commit("filterAppointments");
    },
    setEarliestDate(state, earliestDate) {
      state.earliestDateFilter = earliestDate;
      this.commit("filterAppointments");
    },
    setLatestDate(state, latestDate) {
      state.latestDateFilter = latestDate;
      this.commit("filterAppointments");
    },
    increment(state) {
      state.count++;
    },
  },
  actions: {
    async fetchAppointments({ commit, getters }) {
      try {
        const agentsData = await fetchAllRecords(CONSTANTS.AT_TN_AGENTS);
        const agents = agentsData.map((agent) => {
          return {
            ...agent,
            agent_name: `${agent.fields.agent_name} ${agent.fields.agent_surname}`,
          };
        });

        const records = await fetchAllRecords(CONSTANTS.AT_TN_APPOINTMENTS);
        commit("setAppointments", records);
        commit("setAgents", agents);

        // Update agent color map after fetching appointments
        const agentColorMap = createAgentColorMap(records);
        commit("setAgentColorMap", agentColorMap);

        // Create agent filter using getters directly
        const agentFilters = createAgentFilter(records, getters);
        commit("setAgentFilter", agentFilters);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },
    increment({ commit }) {
      commit("increment");
    },
  },
  getters: {
    appointments: (state) => state.appointments,
    count: (state) => state.count,
    agentColor: (state) => (agentId) => {
      return state.agentColorMap[agentId] || "gray"; // just in case the map is missing that id
    },
    agentFilter: (state) => state.agentFilter,
    activeStatus: (state) => state.activeStatus,
    agents: (state) => {
      return state.agents;
    },
  },
});

// HELPER FUNCTIONS---------------------------------------------------------------
// function to create [random unique color]-[agent] pairs
function createAgentColorMap(appointments) {
  const agentColorMap = {};

  appointments.forEach((appointment) => {
    const agentIds = appointment.fields.agent_id || []; // Get agent_id array or default to empty array
    const agentColor = getRandomColor(); // Generate a random color for each agent

    agentIds.forEach((agentId) => {
      if (agentId && !agentColorMap[agentId]) {
        agentColorMap[agentId] = agentColor;
      }
    });
  });

  return agentColorMap;
}

// Function to create agent filter list
function createAgentFilter(records, getters) {
  let agentFilters = [];

  records.forEach((record) => {
    record.fields.agent_id?.forEach((agentId, index) => {
      let agentFilter = {};
      agentFilter.agentId = agentId;
      agentFilter.color = getters.agentColor(agentId);
      agentFilter.shortName =
        record.fields.agent_name[index][0] +
        record.fields.agent_surname[index][0];
      if (agentFilters.some((item) => item.agentId === agentId) === false) {
        agentFilters.push(agentFilter);
      }
    });
  });

  return agentFilters;
}

// Function to generate a random hexadecimal color
// If the color is gray, repicking the color to avoid potential visual problem with the avatar for more
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  let isGray = true;

  while (isGray) {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // Check if the color is not a shade of gray
    isGray =
      /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color) && color.match(/^#(.)\1{2}/);
  }

  return color;
}

function getTimeDiff(appointmentDate) {
  const now = new Date();
  const appointmentTime = new Date(appointmentDate);

  // if the date is earlier, return 'completed'
  if (appointmentTime < now) {
    return "completed";
  }

  const diff = appointmentTime - now;

  const msInMinute = 60 * 1000;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;
  const msInYear = msInDay * 365;

  const years = Math.floor(diff / msInYear);
  const days = Math.floor((diff % msInYear) / msInDay);
  const hours = Math.floor((diff % msInDay) / msInHour);
  const minutes = Math.floor((diff % msInHour) / msInMinute);

  let timeString = "";

  if (years > 0) {
    timeString = `> ${years} year${years > 1 ? "s" : ""}`;
  } else if (days > 0) {
    timeString = `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    timeString = `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    timeString = `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return timeString;
}
function parseDate(dateString) {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function isAppointmentWithinRange(earliestDate, latestDate, appointment) {
  const appointmentDate = new Date(appointment.fields.appointment_date);

  // If earliestDate is provided, parse it and compare
  if (earliestDate) {
    const earliest = parseDate(earliestDate);
    if (appointmentDate < earliest) {
      return false;
    }
  }

  // If latestDate is provided, parse it and compare
  if (latestDate) {
    const latest = parseDate(latestDate);
    if (appointmentDate > latest) {
      return false;
    }
  }

  return true;
}

export default store;
