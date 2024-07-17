import { createStore } from "vuex";
import { fetchAllRecords } from "@/services/airtable";
import CONSTANTS from "@/constants";

const store = createStore({
  state: {
    appointments: [],
    filteredAppointments: [],
    agents: [],
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
      const agent = state.agents.find(x=>x.id === agentId)
      return ({...agent.fields}.color);
    },
    agentFilter: (state) => state.agentFilter,
    activeStatus: (state) => state.activeStatus,
    agents: (state) => {
      return state.agents;
    },
  },
});

// HELPER FUNCTIONS---------------------------------------------------------------

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
