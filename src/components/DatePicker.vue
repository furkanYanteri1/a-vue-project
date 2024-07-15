<template>
    <div class="dropdown-container">
      <div class="custom-select-wrapper">
        <select v-model="earliestDate" @change="handleDateChange">
          <option disabled value="">Earliest Date</option>
          <option v-for="date in dateOptions" :key="date">{{ date }}</option>
        </select>
        <div class="custom-icon">
          <font-awesome-icon icon="calendar-alt" />
        </div>
      </div>
      <div class="custom-select-wrapper">
        <select v-model="latestDate" @change="handleDateChange">
          <option disabled value="">Latest Date</option>
          <option v-for="date in dateOptions" :key="date">{{ date }}</option>
        </select>
        <div class="custom-icon">
          <font-awesome-icon icon="calendar-alt" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "DatePicker",
    components: {
      FontAwesomeIcon,
    },
    data() {
      return {
        earliestDate: "",
        latestDate: "",
        dateOptions: [], // Populate with your date options
      };
    },
    methods: {
      handleDateChange() {
        // Handle date change logic if needed
        console.log("Earliest Date:", this.earliestDate);
        console.log("Latest Date:", this.latestDate);
      },
    },
  });
  </script>
  
  <style scoped>
  .dropdown-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .custom-select-wrapper {
    position: relative;
    margin: 0 10px;
    display: inline-block;
    width: 200px;
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
  
  .custom-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: gray;
  }
  </style>
  