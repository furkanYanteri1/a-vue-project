<template>
  <div class="dropdown-container">
    <div class="custom-select-wrapper">
      <select
        id="statuseselect"
        v-model="selectedStatus"
        @change="statusChanged"
      >
        <option value="">All Statuses</option>
        <option
          v-for="status in statuses"
          :key="status.key"
          :value="status.value"
        >
          {{ status.value }}
        </option>
      </select>
      <div class="custom-arrow"></div>
    </div>
  </div>
</template>
  
  <script>
import { mapMutations } from "vuex";

export default {
  name: "statusDropdown",
  data() {
    return {
      selectedStatus: "",
      statuses: [
        { key: "Cancelled", value: "Cancelled" },
        { key: "Upcoming", value: "Upcoming" },
        { key: "Completed", value: "Completed" },
      ],
    };
  },
  methods: {
    ...mapMutations(["changeStatus"]),
    getstatusName(statusValue) {
      const status = this.statuses.find((c) => c.value === statusValue);
      return status ? status.name : "Unknown status";
    },
    statusChanged() {
      this.changeStatus(this.selectedStatus)
    },
  },
};
</script>
  
  <style scoped>
.dropdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.custom-select-wrapper {
  position: relative;
  display: inline-block;
  min-width: 100px;
}

select {
  width: 100%;
  padding: 10px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}

.custom-arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  width: 0;
  height: 0;
  pointer-events: none;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  transform: translateY(-50%);
}
</style>
  