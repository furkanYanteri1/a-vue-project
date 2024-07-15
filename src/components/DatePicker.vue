<template>
    <div class="dropdown-container">
      <div :class="['custom-select-wrapper', { 'active-date': earliestDate }]">
        <select v-model="earliestDate" @click="openEarliestDatePicker">
          <option disabled value="">Earliest Date</option>
          <option :value="earliestDate" v-if="earliestDate">
            {{ earliestDate }}
          </option>
        </select>
        <div class="custom-icons">
          <font-awesome-icon
            :class="{ 'active-icon': earliestDate }"
            icon="calendar-alt"
            @click="openEarliestDatePicker"
          />
          <font-awesome-icon
            icon="times"
            @click="clearEarliestDate"
            v-if="earliestDate"
          />
        </div>
      </div>
      <div :class="['custom-select-wrapper', { 'active-date': latestDate }]">
        <select v-model="latestDate" @click="openLatestDatePicker">
          <option disabled value="">Latest Date</option>
          <option :value="latestDate" v-if="latestDate">{{ latestDate }}</option>
        </select>
        <div class="custom-icons">
          <font-awesome-icon
            :class="{ 'active-icon': latestDate }"
            icon="calendar-alt"
            @click="openLatestDatePicker"
          />
          <font-awesome-icon
            icon="times"
            @click="clearLatestDate"
            v-if="latestDate"
          />
        </div>
      </div>
  
      <!-- Dialog for Earliest Date Picker -->
      <v-dialog v-model="showEarliestDatePicker" persistent max-width="380">
        <v-card>
          <v-card-title>Select the Earliest Date</v-card-title>
          <v-card-text>
            <v-date-picker
              v-model="selectedEarliestDate"
              @update:modelValue="handleEarliestDateSelect"
              :first-day-of-week="1"
              :locale="'en-GB'"
            ></v-date-picker>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="closeEarliestDatePicker">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Dialog for Latest Date Picker -->
      <v-dialog v-model="showLatestDatePicker" persistent max-width="290">
        <v-card>
          <v-card-title>Select the Latest Date</v-card-title>
          <v-card-text>
            <v-date-picker
              v-model="selectedLatestDate"
              :min="earliestDate ? parseDate(earliestDate) : null"
              @update:modelValue="handleLatestDateSelect"
              :first-day-of-week="1"
              :locale="'en-GB'"
            ></v-date-picker>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="closeLatestDatePicker">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { defineComponent } from "vue";
  import { mapMutations } from "vuex";
  
  export default defineComponent({
    name: "DatePicker",
    components: {
      FontAwesomeIcon,
    },
    data() {
      return {
        earliestDate: "",
        latestDate: "",
        selectedEarliestDate: null,
        selectedLatestDate: null,
        showEarliestDatePicker: false,
        showLatestDatePicker: false,
      };
    },
    methods: {
      ...mapMutations(["setEarliestDate", "setLatestDate"]),
      openEarliestDatePicker() {
        this.showEarliestDatePicker = true;
      },
      openLatestDatePicker() {
        this.showLatestDatePicker = true;
      },
      handleEarliestDateSelect(date) {
        this.earliestDate = this.formatDate(date);
        this.setEarliestDate(this.earliestDate);
        this.closeEarliestDatePicker();
      },
      handleLatestDateSelect(date) {
        this.latestDate = this.formatDate(date);
        this.setLatestDate(this.latestDate);
        this.closeLatestDatePicker();
      },
      closeEarliestDatePicker() {
        this.showEarliestDatePicker = false;
      },
      closeLatestDatePicker() {
        this.showLatestDatePicker = false;
      },
      clearEarliestDate() {
        this.earliestDate = "";
        this.selectedEarliestDate = null;
        this.setEarliestDate("");
      },
      clearLatestDate() {
        this.latestDate = "";
        this.selectedLatestDate = null;
        this.setLatestDate("");
      },
      formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
      parseDate(dateString) {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
      }
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
    padding: 11px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
  }
  
  .custom-icons {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    display: flex;
    gap: 15px;
    color: gray;
  }
  
  .custom-icons .fa-icon {
    color: gray;
    cursor: pointer;
  }
  
  .active-date select {
    border-color: deepskyblue;
  }
  
  .active-icon {
    color: deepskyblue !important;
  }
  </style>
  