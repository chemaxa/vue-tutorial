<template>
  <div id="app">
    <p> 
      <router-link :to="'/'">
        Home
      </router-link>
    </p> 
    <p>  
      <router-link :to="'profile'"
        v-if="authenticated">
          Profile
      </router-link>
    </p> 
    <p>      
      <button v-if="!authenticated" @click="login()">
        Log In
      </button>
    </p>
    <p> 
      <button v-if="authenticated" @click="logout()">
        Log Out
      </button>
    </p> 
    <router-view :auth="auth" :authenticated="authenticated">
    </router-view>
  </div>
</template>

<script>
import AuthService from './service/Auth.js'
const auth = new AuthService()
const { login, logout, authenticated, authNotifier } = auth
export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
