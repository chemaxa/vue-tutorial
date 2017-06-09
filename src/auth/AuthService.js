import Auth0Lock from 'auth0-lock'
import EventEmitter from 'event-emitter'
import Router from 'vue-router'

export default class AuthService {

  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()
  userProfile;
  router = new Router()

  auth0 = new Auth0Lock('mvthbIGYJ55O1duscfl57TGoUAGfLAOX', 'chemaxa.eu.auth0.com', {
    oidcConformant: true,
    autoclose: true,
    auth: {
      audience: 'https://chemaxa.eu.auth0.com/userinfo',
      responseType: 'token id_token',
      params: {
        scope: 'openid profile'
      }
    }
  })

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getProfile = this.getProfile.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login () {
    this.auth0.show()
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
    this.router.push('')
  }

  logout () {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    this.userProfile = null
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    this.router.replace('')
  }

  getAccessToken () {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      this.login()
      // throw new Error('No access token found')
    }
    return accessToken
  }

  getProfile (cb) {
    let accessToken = this.getAccessToken()
    let self = this
    this.auth0.getUserInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile
      }
      cb(err, profile)
    })
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
