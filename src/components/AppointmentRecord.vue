<template>
    <div class="appointment-record">
      <div class="column">Part 1</div>
      <div class="column">Part 2</div>
      <div class="column">Part 3</div>
      <div class="column">Part 4</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppointmentRecord',
    props: {
      record: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .appointment-record {
    display: flex;
    border-bottom: 1px solid #ccc;
  }
  
  .column {
    flex: 1;
    border: 1px solid #000;
    padding: 10px;
    box-sizing: border-box;
  }
  </style>
  