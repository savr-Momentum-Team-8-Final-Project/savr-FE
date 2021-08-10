import axios from 'axios'

export function requestLogin (username, password) {
  return axios.post('https://savr-travel.herokuapp.com/auth/token/login', {
    username: username,
    password: password
  })
}

export function requestLogout (token) {
  return axios.post('https://savr-travel.herokuapp.com/auth/token/logout',
    {},
    {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response)
}

export function requestRegistration (name, username, email, password) {
  return axios.post('https://savr-travel.herokuapp.com/api/accounts/signup',
    {
      name: name,
      username: username,
      email: email,
      password: password
    },
    {}
  )
    .then((response) => response)
}

export function requestStates () {
    return axios.get('https://api.countrystatecity.in/v1/countries/US/states',
    {
        headers: {
            'X-CSCAPI-KEY': 'UW9CcHFJUUFmb0dFYXhUbXA2RVE1akIwaENjVFZGZkVrNkNRd0VzTQ==' 
        }
    }
    )
    .then((response) => response)
}
