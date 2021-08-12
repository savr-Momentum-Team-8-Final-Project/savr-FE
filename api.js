import axios from "axios";

export function requestLogin(username, password) {
  return axios.post("https://savr-travel.herokuapp.com/auth/token/login", {
    username: username,
    password: password,
  });
}

export function requestLogout(token) {
  return axios
    .post(
      "https://savr-travel.herokuapp.com/auth/token/logout",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response);
}

export function requestRegistration(username, email, password, password2) {
  // console.log(username);
  return axios
    .post("https://savr-travel.herokuapp.com/api/accounts/signup", {
      name: username,
      email: email,
      password: password,
      password2: password2,
    })
    .then((response) => console.log(response.data));
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

export function requestCities (state) {
    return axios.get(`https://api.countrystatecity.in/v1/countries/US/states/${state}/cities`,
    {
        headers: {
            'X-CSCAPI-KEY': 'UW9CcHFJUUFmb0dFYXhUbXA2RVE1akIwaENjVFZGZkVrNkNRd0VzTQ==' 
        }
    }
    )
    .then((response) => response)
}

export function requestTrips () {
    return axios.get('https://savr-travel.herokuapp.com/api/trip/')
    .then(response => response)
}