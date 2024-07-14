<template>
  <div class="topbar">
    <AgentAvatars :avatars="agentFilter" />
    <h1>My Data Table</h1>
    <!-- Add filters and other elements here -->
  </div>
</template>

<script>
import AgentAvatars from "./AgentAvatars.vue";
import { mapGetters } from 'vuex'


export default {
  name: "TopBar",
  components: {
    AgentAvatars,
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
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
}
</style>
