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
import { fetchData } from '@/services/airtable'

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
      const records = await fetchData();
      console.log(records);
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
