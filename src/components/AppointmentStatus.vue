<template>
    <div class="appointment-status">
      <v-card class="d-flex align-center" outlined>
        <div v-if="isCancelled" class="status-text cancelled">Cancelled</div>
        <div v-else-if="timeLeft === 'completed'" class="status-text completed">Completed</div>
        <div v-else class="status-text upcoming">
          <span class="upcoming-text">Upcoming</span>
          <span class="time-left">{{ timeLeft }}</span>
        </div>
        <v-spacer></v-spacer>
        <font-awesome-icon icon="clock" class="clock-icon mx-2" />
        <span class="date-time">{{dateStr}}</span>
      </v-card>
    </div>
  </template>
  
  
  
  <script>
export default {
  name: "AppointmentStatus",
  props: {
    isCancelled: {
      type: Boolean,
      required: true,
    },
    timeLeft: {
      type: String,
      required: true,
    },
    dateStr: {
        type: String,
        required: true,
    }
  },
  created() {
    console.log("STAT", this.isCompleted);
  },
};
</script>
  
  <style scoped>
.appointment-status {
  max-width: 400px;
}

.v-card {
  background-color: #f01c84; /* same color as your example */
  padding: 8px;
  border-radius: 8px;
}

.status-text {
  background-color: white;
  padding: 12px 5px;
  border-radius: 5px;
  width: 60%;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: center; /* Default centering for all status texts */
  align-items: center;
}

.cancelled {
  color: red;
}

.completed {
  color: green;
}

.upcoming {
  color: orange;
  justify-content: space-between; /* Override centering for upcoming status */
}

.upcoming-text {
  flex: 1;
  text-align: left;
}

.time-left {
  flex: 1;
  text-align: right;
}

.date-time {
  color: white;
  font-size: 13px;
}

.clock-icon {
  color: white;
}

</style>
  