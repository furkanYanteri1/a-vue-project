<template>
  <div class="topbar">
    <AgentAvatars :avatars="agentFilter" />
    <StatusFilter />
    <DatePicker />
    <SearchBar />
  </div>
  <div class="pr-7 py-1">
    <span class="appointments-count float-left mx-3">230 appointments found</span>
      <v-btn class="float-right mr-10" color="pink">
        <font-awesome-icon class="info-icon" :icon="['fas', 'plus-circle']" />
        Create Appointment
      </v-btn>
  </div>
</template>

<script>
import AgentAvatars from "./AgentAvatars.vue";
import { mapGetters } from 'vuex'
import StatusFilter from './StatusFilter.vue'
import DatePicker from "./DatePicker.vue";
import SearchBar from "./SearchBar.vue"; // Import your SearchBar component

export default {
  name: "TopBar",
  components: {
    AgentAvatars,
    StatusFilter,
    DatePicker,
    SearchBar, // Register the SearchBar component
  },
  computed: {
    ...mapGetters(['agentFilter']),
  },
};
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  /* background-color: #2c3e50; */
  background-color: rgb(230, 230, 230);
  border: 1px solid rgb(68, 68, 68);
  color: white;
}
</style>
