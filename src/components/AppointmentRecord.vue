<template>
  <div class="appointment-record">
    <div class="column">
      <div class="contact-info">
        <font-awesome-icon class="info-icon" :icon="['fas', 'user']" />
        {{
          (record.fields.contact_name?.[0] || "") +
          " " +
          (record.fields.contact_surname?.[0] || "")
        }}
      </div>
      <div class="contact-info email">
        <font-awesome-icon class="info-icon" :icon="['fas', 'envelope']" />
        {{ record.fields.contact_email?.[0] || "" }}
      </div>
      <div class="contact-info email">
        <font-awesome-icon class="info-icon" :icon="['fas', 'phone']" />
        {{ record.fields.contact_phone?.[0] || "" }}
      </div>
    </div>
    <div class="column">
      <div class="contact-info address">
        <font-awesome-icon class="info-icon" :icon="['fas', 'home']" />
        {{ record.fields?.appointment_address || "" }}
      </div>
    </div>
    <div class="column status">
      <appointment-status
        :isCancelled="record.fields?.is_cancelled || false"
        :timeLeft="getTimeDiff(record.fields?.appointment_date)"
        :dateStr="formatDate(record.fields?.appointment_date)"
      ></appointment-status>
    </div>
    <div class="column">
      <div class="contact-info avatars">
        <AgentAvatars :avatars="getAvatarInfos()" />
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AppointmentStatus from "./AppointmentStatus.vue";
import AgentAvatars from "./AgentAvatars.vue";
import { mapGetters } from 'vuex'

// Add all icons from the solid icons library
library.add(fas);

export default defineComponent({
  name: "AppointmentRecord",
  components: {
    FontAwesomeIcon,
    AppointmentStatus,
    AgentAvatars,
  },
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['agentColor']), // Ensure agentColor getter is mapped
  },
  methods: {
    getTimeDiff(appointmentDate) {
      const now = new Date();
      const appointmentTime = new Date(appointmentDate);

      // if the date is earlier, return 'completed'
      if (appointmentTime < now) {
        return 'completed';
      }

      const diff = appointmentTime - now;

      const msInMinute = 60 * 1000;
      const msInHour = msInMinute * 60;
      const msInDay = msInHour * 24;
      const msInYear = msInDay * 365;

      const years = Math.floor(diff / msInYear);
      const days = Math.floor((diff % msInYear) / msInDay);
      const hours = Math.floor((diff % msInDay) / msInHour);
      const minutes = Math.floor((diff % msInHour) / msInMinute);

      let timeString = '';

      if (years > 0) {
        timeString = `> ${years} year${years > 1 ? 's' : ''}`;
      } else if (days > 0) {
        timeString = `${days} day${days > 1 ? 's' : ''}`;
      } else if (hours > 0) {
        timeString = `${hours} hour${hours > 1 ? 's' : ''}`;
      } else {
        timeString = `${minutes} minute${minutes > 1 ? 's' : ''}`;
      }

      return timeString;
    },
    formatDate(dateStr){
      const date = new Date(dateStr);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
    getAvatarInfos(){
      var infos = []
      this.record.fields?.agent_id.forEach((id,index) => {
        let pair={}
        // pair.shortName = `${this.record.fields.agent_name[index][0]}`;
        pair.shortName = `${this.record.fields.agent_name[index][0]}${this.record.fields.agent_surname[index][0]}`;
        pair.color = this.agentColor(this.record.fields?.agent_id[index]|| '')
        infos.push(pair)
      });
      console.log('INFOS', infos);
      return infos
    }
  },
  created() {
    // console.log(this.record);
  },
});
</script>

<style scoped>
.appointment-record {
  display: flex;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
}

.column {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px; 
  min-width: 0; /* prevent content overflow when shrinked */
}

.contact-info {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center; /* Align items to the center vertically */
  justify-content: flex-start; /* Align items to the start (left) */
  padding-left: 20px;
  color: rgb(61, 61, 61);
}

.avatars {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status {
  flex: 1;
  min-width: 30%; /* Status should remain the biggest for small screens */
}

.email {
  font-size: 10px;
  color: gray;
}

.address {
  font-size: 10px;
  color: rgb(61, 61, 61);
  font-weight: bold;
}

.info-icon {
  font-size: 14px;
  color: gray;
  padding-right: 5px;
}

@media (max-width: 700px) {
  /* In smaller screens make the records listed 1 bu 1 vertically */
  .column {
    flex-basis: 100%;
    max-width: 100%;
  }
  .appointment-record{
    border-bottom: 2px solid rgb(61, 61, 61);
  }
}
</style>

