<template>
  <div class="data-table">
    <AppointmentRecord
      v-for="record in records"
      :key="record.id"
      :record="record"
    />
  </div>
</template>

<script>
import AppointmentRecord from '@/components/AppointmentRecord.vue'

export default {
  name: 'DataTable',
  components: {
    AppointmentRecord
  },
  props: {
    records: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.data-table {
  width: 100%;
}
</style>
