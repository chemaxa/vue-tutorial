
<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <counter :message=msg></counter>
  </div>
</template>

<script>
import counter from './Counter.vue'
export default {
  name: 'Home',
  props: ['auth'],
  data () {
    return {
      title: 'Home',
      msg: this.auth.isAuthenticated()
    }
  },
  components: {
    counter
  }
}
</script>

<style scoped>

</style>
