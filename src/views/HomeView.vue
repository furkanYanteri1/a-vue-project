<template>
  <div class="home-view">
    <TopBar />
    <DataTable :records="paginatedRecords" />
    <div class="pagination-container">
      <DataTablePagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @updatePage="updatePage"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopBar from '@/components/TopBar.vue'
import DataTable from '@/components/DataTable.vue'
import DataTablePagination from '@/components/DataTablePagination.vue'

export default {
  name: 'HomeView',
  components: {
    TopBar,
    DataTable,
    DataTablePagination,
  },
  data() {
    return {
      currentPage: 1,
      recordsPerPage: 10,
    };
  },
  computed: {
    ...mapState(['filteredAppointments']),
    totalPages() {
      return Math.ceil(this.filteredAppointments.length / this.recordsPerPage);
    },
    paginatedRecords() {
      const start = (this.currentPage - 1) * this.recordsPerPage;
      const end = start + this.recordsPerPage;
      return this.filteredAppointments.slice(start, end);
    }
  },
  methods: {
    updatePage(page) {
      this.currentPage = page;
    }
  },
  async created() {
    try {
      console.log('Fetching data in HomeView...');
      await this.$store.dispatch('fetchAppointments');
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

.pagination-container {
  margin-top: auto;
  align-self: flex-end;
}
</style>
