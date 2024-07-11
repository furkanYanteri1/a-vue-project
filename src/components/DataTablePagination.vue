<template>
  <div class="pagination">
    <button @click="previousPage" :disabled="currentPage === 1">‹</button>
    <span
      v-for="page in visiblePages"
      :key="page"
      @click="updatePage(page)"
      :class="['page', { active: page === currentPage }]"
    >
      {{ page }}
    </span>
    <button @click="nextPage" :disabled="currentPage === totalPages">›</button>
  </div>
</template>

<script>
export default {
  name: 'DataTablePagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    visiblePages() {
      const halfRange = 2;
      let start = this.currentPage - halfRange;
      let end = this.currentPage + halfRange;

      if (start < 1) {
        start = 1;
        end = Math.min(start + 4, this.totalPages);
      } else if (end > this.totalPages) {
        end = this.totalPages;
        start = Math.max(end - 4, 1);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('updatePage', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('updatePage', this.currentPage + 1);
      }
    },
    updatePage(page) {
      this.$emit('updatePage', page);
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
}

button {
  margin: 0 5px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  width: 30px;
  height: 30px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  cursor: pointer;
}

.page.active {
  background-color: #f50057;
  color: white;
  border: 1px solid #f50057;
}
</style>
