<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      @input="handleSearchInput"
    />
    <div class="custom-icon ml-n5">
      <font-awesome-icon icon="times" @click="clearSearch" />
    </div>
  </div>
</template>
  
  <script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "SearchBar",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleSearchInput() {
      this.$emit("search", this.searchQuery);
    },
    clearSearch() {
      this.searchQuery = "";
      this.$emit("search", "");
    },
  },
};
</script>
  
  <style scoped>
.search-bar {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  margin-right: 0px;
  margin-left: 20px;
  min-width: 150px;
}

.search-bar input {
  width: 90%;
  padding: 10px;
  margin-right: 0px;
  font-size: 13px;
  font-weight: bold;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
}

.custom-icon {
  font-size: 13px;
  font-weight: bold;
  color: gray;
}
</style>
  