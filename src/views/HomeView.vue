<template>
  <div class="home-view">
    <TopBar />
    <DataTable />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TopBar from '@/components/TopBar.vue'
import DataTable from '@/components/DataTable.vue'
import { fetchAllRecords } from '@/services/airtable'
import CONSTANTS from '@/constants';

export default {
  name: 'HomeView',
  components: {
    TopBar,
    DataTable,
  },
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapActions(['increment'])
  },
  async created() {
    try {
      console.log('Fetching data in HomeView...', CONSTANTS.AT_TN_APPOINTMENTS);
      const records = await fetchAllRecords(CONSTANTS.AT_TN_APPOINTMENTS);
      console.log('Fetched records:', records);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
