<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>
        <font-awesome-icon class="info-icon" :icon="['fas', 'calendar-alt']" />
        Create an Appointment
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="12" sm="12">
            <v-text-field
              label="Address*"
              v-model="address"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="12" sm="12">
            <v-autocomplete
              :items="agents"
              item-title="agent_name"
              item-value="id"
              label="Agent(s)*"
              multiple
              v-model="selectedAgents"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="12" sm="12">
            <v-text-field
              label="Appointment date*"
              v-model="date"
              required
              @click="showDatePicker = true"
            ></v-text-field>
          </v-col>
        </v-row>

        <small class="text-caption text-medium-emphasis"
          >*indicates required field</small
        >
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

        <v-btn
          :disabled="!canSave"
          color="primary"
          text="Save"
          variant="tonal"
          @click="createAppointment"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showDatePicker" persistent max-width="380">
    <v-card>
      <v-card-title>Select Appointment Date</v-card-title>
      <v-card-text>
        <v-date-picker
          v-model="appointmentDate"
          :first-day-of-week="1"
          :locale="'en-GB'"
        ></v-date-picker>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="handlePlannedDate">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { createAppointment } from "@/services/airtable";

export default {
  name: "AppointmentDialog",
  data() {
    return {
      dialog: false,
      address: "",
      date: "",
      selectedAgents: [],
      showDatePicker: false,
      appointmentDate: null,
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    closeDatePicker() {
      this.showDatePicker = false;
    },
    createAppointment() {
      console.log('save');
      const appObj = {
        address: this.address,
        date: this.date,
        agents: JSON.stringify(this.selectedAgents)
      };
      console.log('appObj', appObj);
      createAppointment(appObj)
        .then((record) => {
          console.log("Appointment successfully created:", record);
          this.close();
        })
        .catch((err) => {
          console.error("Error creating appointment:", err);
        });
    },
    handlePlannedDate() {
      this.date = this.appointmentDate.toLocaleDateString('en-US');
      console.log('this.date', this.date); // Example output: 07/16/2024
      this.showDatePicker = false;
    },
  },
  computed: {
    ...mapGetters(['agents']),
    canSave() {
      return this.address !== "" && this.date !== "" && this.selectedAgents.length > 0;
    }
  },
  watch: {
    selectedAgents(newVal) {
      console.log('Selected agents:', newVal);
    },
  },
};
</script>
