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

export default {
  name: 'HomeView',
  components: {
    TopBar,
    DataTable,
  },
  computed: {
    ...mapState(['count', 'appointments'])
  },
  methods: {
    ...mapActions(['increment', 'fetchAppointments'])
  },
  async created() {
    try {
      console.log('Fetching appointments in HomeView...')
      await this.fetchAppointments()
      console.log('Fetched appointments:', this.appointments)
    } catch (error) {
      console.error('Error fetching data:', error)
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
