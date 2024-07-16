<template>
  <div class="topbar">
    <AgentAvatars :avatars="agentFilter" />
    <StatusFilter />
    <DatePicker />
    <SearchBar />
  </div>
  <div class="py-1">
    <span class="appointments-count float-left mx-3">230 appointments found</span>
    <v-btn class="float-right mr-8" color="#f01c84" @click="openDialog">
      <font-awesome-icon class="info-icon" :icon="['fas', 'plus-circle']" />
      Create Appointment
    </v-btn>
    <AppointmentDialog ref="appointmentDialog" />
  </div>
</template>

<script>
import AgentAvatars from "./AgentAvatars.vue";
import { mapGetters } from 'vuex';
import StatusFilter from './StatusFilter.vue';
import DatePicker from "./DatePicker.vue";
import SearchBar from "./SearchBar.vue";
import AppointmentDialog from './AppointmentDialog.vue';

export default {
  name: "TopBar",
  components: {
    AgentAvatars,
    StatusFilter,
    DatePicker,
    SearchBar,
    AppointmentDialog,
  },
  computed: {
    ...mapGetters(['agentFilter']),
  },
  methods: {
    openDialog() {
      this.$refs.appointmentDialog.open();
    },
  },
};
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  background-color: rgb(230, 230, 230);
  border: 1px solid rgb(68, 68, 68);
  color: white;
}
</style>
