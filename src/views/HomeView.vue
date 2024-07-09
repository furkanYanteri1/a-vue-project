<template>
  <div>
    <h1>Home View</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapActions(['increment'])
  }
}
</script>

<style scoped>
/* Add styles here */
</style>
