<template>
  <div class="panel panel-default profile-area">
    <div class="panel-heading">
      <h3>Profile</h3>
    </div>
    <div class="panel-body">
      <img :src="profile.picture" class="avatar" alt="avatar">
      <div>
        <label>
          <i class="glyphicon glyphicon-user"></i> Nickname</label>
        <h3 class="nickname">{{ profile.nickname }}</h3>
      </div>
      <p>{{profile}}</p>
      <p>{{userData}}</p>
    </div>
    <counter :auth=auth></counter>
  </div>
</template>

<script>
import counter from './Counter.vue'
import UserService from '@/service/User'
const user = new UserService()
export default {
  props: ['auth'],
  data () {
    if (this.auth.userProfile) {
      this.$nextTick(() => {
        this.profile = this.auth.userProfile
      })
    } else {
      this.auth.getProfile((err, profile) => {
        if (err) return console.log(err)
        this.profile = profile
      })
    }
    if (user.userData) {
      this.$nextTick(() => {
        this.userData = user.userData
      })
    } else {
      user.getUserData((err, data) => {
        if (err) return console.log(err)
        this.userData = data
      })
    }
    return {
      userData: {},
      profile: {}
    }
  },
  components: {
    counter
  }
}
</script>

<style>
.profile-area img {
  max-width: 150px;
  margin-bottom: 20px;
}

.panel-body h3 {
  margin-top: 0;
}
</style>
