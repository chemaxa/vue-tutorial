import Auth0 from 'auth0-js'
import { AUTH_CONFIG } from './credentials'

export default class UserService {
  auth0Manage = new Auth0.Management({
    domain: AUTH_CONFIG.domain,
    token: AUTH_CONFIG.clientId
  })
  userData

  constructor () {
    this.getUserData = this.getUserData.bind(this)
  }

  getUserData (cb) {
    const accessToken = localStorage.getItem('access_token')
    let self = this
    this.auth0Manage.getUser(accessToken, (err, data) => {
      if (data) {
        self.userData = data
      }
      cb(err, data)
    })
  }
}
