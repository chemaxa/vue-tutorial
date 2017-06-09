<template>
  <div class="counter">
    <h2>{{title}}</h2>
    <p> {{counter}}</p>
    <h3>Profile</h3>
    <ol>
      <li v-for="(value, key) in profile">
        {{key.toUpperCase()}} - {{ value }}
      </li>
    </ol>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
  </div>
</template>

<script>
export default {
  name: 'counter',
  props: ['message', 'auth'],
  data () {
    if (this.auth.userProfile) {
      this.$nextTick(() => {
        this.profile = this.auth.userProfile
      })
    } else {
      this.auth.getProfile((err, profile) => {
        if (err) {
          console.log('Error: ', err)
        } else {
          this.profile = profile
        }
      })
    }
    return {
      title: 'Counter',
      counter: parseInt(localStorage.getItem('counter')) || 0,
      msg: this.message,
      profile: {}
    }
  },
  methods: {
    increment () {
      this.counter++
      localStorage.setItem('counter', this.counter)
    },
    decrement () {
      this.counter--
      localStorage.setItem('counter', this.counter)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
