<!-- AppointmentDialog.vue -->
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
                label="Agent"
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
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
    
  <script>
  import { mapGetters } from "vuex";
  export default {
    name: "AppointmentDialog",
    data() {
      return {
        dialog: false,
        address: "",
        date: "",
        selectedAgents: [], // Add this line to manage selected agents
      };
    },
    methods: {
      open() {
        this.dialog = true;
      },
      close() {
        this.dialog = false;
      },
      save() {
        // Save logic will be implemented later
        this.close();
      },
    },
    computed: {
      ...mapGetters(['agents']),
    },
    watch: {
      selectedAgents(newVal) {
        console.log('Selected agents:', newVal);
      },
    },
  };
  </script>
  