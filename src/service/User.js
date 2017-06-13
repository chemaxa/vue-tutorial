import Auth0 from 'auth0-js'

export default class UserService {
  auth0Manage = new Auth0.Management({
    domain: 'chemaxa.eu.auth0.com',
    token: 'YOUR_PRIMARY_IDENTITY_TOKEN'
  });
}
