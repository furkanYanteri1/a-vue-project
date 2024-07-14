<template>
  <div class="appointment-record">
    <div class="column">
      <div class="contact-info">
        <font-awesome-icon class="info-icon" :icon="['fas', 'user']" />
        {{ (record.fields.contact_name?.[0] || '') + ' ' + (record.fields.contact_surname?.[0] || '') }}
      </div>
      <div class="contact-info email">
        <font-awesome-icon class="info-icon" :icon="['fas', 'envelope']" />
        {{ record.fields.contact_email?.[0] || '' }}
      </div>
      <div class="contact-info email">
        <font-awesome-icon class="info-icon" :icon="['fas', 'phone']" />
        {{ record.fields.contact_phone?.[0] || '' }}
      </div>
    </div>
    <div class="column">
      <div class="contact-info address">
        <font-awesome-icon class="info-icon" :icon="['fas', 'home']" />
        {{ record.fields?.appointment_address || '' }}
      </div>
    </div>
    <div class="column">Part 4</div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { defineComponent } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Add all icons from the solid icons library
library.add(fas)

export default defineComponent({
  name: 'AppointmentRecord',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FontAwesomeIcon
  },
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  created(){
    console.log(this.record)
  }
})
</script>

<style scoped>
.appointment-record {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.column {
  flex: 1;
  border: 1px solid #000;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Align items to the start (top) */
}

.contact-info {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center; /* Align items to the center vertically */
  justify-content: flex-start; /* Align items to the start (left) */
  padding-left: 20%;
  color: rgb(61, 61, 61);
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

.info-icon{
  font-size: 14px;
  color: gray;
  padding-right: 5%;
}
</style>
