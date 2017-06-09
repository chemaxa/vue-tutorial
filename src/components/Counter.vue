<template>
  <div class="counter">
    <h2>{{title}}</h2>
    <h2>{{msg}}</h2>
    <p> {{counter}}</p>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
  </div>
</template>

<script>
export default {
  name: 'counter',
  props: ['message'],
  data () {
    return {
      title: 'Counter',
      counter: localStorage.getItem('counter') || 0,
      msg: this.message
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
