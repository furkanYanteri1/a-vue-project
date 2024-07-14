import { createStore } from "vuex";
import { fetchAllRecords } from "@/services/airtable";
import CONSTANTS from "@/constants";

const store = createStore({
  state: {
    appointments: [],
    agentColorMap: {},
    agentFilter: [],
    count: 0,
  },
  mutations: {
    setAppointments(state, appointments) {
      state.appointments = appointments;
    },
    setAgentColorMap(state, agentColorMap) {
      state.agentColorMap = agentColorMap;
    },
    setAgentFilter(state, agentFilter) {
      state.agentFilter = agentFilter;
    },
    increment(state) {
      state.count++;
    },
  },
  actions: {
    async fetchAppointments({ commit, getters }) {
      try {
        const records = await fetchAllRecords(CONSTANTS.AT_TN_APPOINTMENTS);
        commit("setAppointments", records);

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
    agentFilter:(state) => state.agentFilter,
  },
});

// Helper function to create agent color mapping with unique colors
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
      agentFilter.shortName = record.fields.agent_name[index][0]+record.fields.agent_surname[index][0]
      if(agentFilters.some(item => item.agentId === agentId) === false){
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
    isGray = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color) && color.match(/^#(.)\1{2}/);
  }

  return color;
}

export default store;
