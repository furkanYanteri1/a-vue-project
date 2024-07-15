<template>
  <div class="topbar">
    <AgentAvatars :avatars="agentFilter" />
    <StatusFilter />
    <DatePicker />
    <h1>My Data Table</h1>
    <!-- Add filters and other elements here -->
  </div>
</template>

<script>
import AgentAvatars from "./AgentAvatars.vue";
import { mapGetters } from 'vuex'
import StatusFilter from './StatusFilter.vue'
import DatePicker from "./DatePicker.vue";


export default {
  name: "TopBar",
  components: {
    AgentAvatars,
    StatusFilter,
    DatePicker,
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
