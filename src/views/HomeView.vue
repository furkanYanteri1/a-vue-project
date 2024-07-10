<template>
  <div class="home-view">
    <TopBar />
    <DataTable />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'HomeView',
  components: {
    TopBar,
    DataTable,
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
