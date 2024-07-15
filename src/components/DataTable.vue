<template>
  <div class="data-table">
    <AppointmentRecord
      v-for="(record, index) in records"
      :key="record.id"
      :record="record"
      :class="{
        'even-row': index % 2 === 0,
        'odd-row': index % 2 !== 0
      }"
    />
  </div>
</template>

<script>
import AppointmentRecord from "@/components/AppointmentRecord.vue";

export default {
  name: "DataTable",
  components: {
    AppointmentRecord,
  },
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.data-table {
  width: 100%;
}

/* Alternating row colors */
.even-row {
  background-color: white;
}

.odd-row {
  background-color: rgb(218, 218, 218);
}
</style>
