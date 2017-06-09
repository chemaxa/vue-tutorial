
<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <p>Loginned: {{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['auth'],
  data () {
    return {
      title: 'Home',
      msg: this.auth.isAuthenticated()
    }
  }
}
</script>

<style scoped>

</style>
