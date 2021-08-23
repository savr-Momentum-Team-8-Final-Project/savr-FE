import axios from "axios";

export function requestLogin(email, password) {
  return axios.post("https://savr-travel.herokuapp.com/auth/token/login", {
    email: email,
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
    .post("https://savr-travel.herokuapp.com/api/accounts/signup/", {
      name: username,
      email: email,
      password: password,
      password2: password2,
    })
    .then((response) => console.log(response.data));
}

export function requestStates() {
  return axios
    .get("https://api.countrystatecity.in/v1/countries/US/states", {
      headers: {
        "X-CSCAPI-KEY":
          "UW9CcHFJUUFmb0dFYXhUbXA2RVE1akIwaENjVFZGZkVrNkNRd0VzTQ==",
      },
    })
    .then((response) => response);
}

export function requestCities(state) {
  return axios
    .get(
      `https://api.countrystatecity.in/v1/countries/US/states/${state}/cities`,
      {
        headers: {
          "X-CSCAPI-KEY":
            "UW9CcHFJUUFmb0dFYXhUbXA2RVE1akIwaENjVFZGZkVrNkNRd0VzTQ==",
        },
      }
    )
    .then((response) => response);
}

export function requestTrips() {
  return axios
    .get("https://savr-travel.herokuapp.com/api/trip/")
    .then((response) => response);
}

export function createTrip(title, start_date, end_date, city, state, budget) {
  return axios
    .post("https://savr-travel.herokuapp.com/api/trip/create/", {
      trip_title: title,
      city: city,
      state: state,
      start_date: start_date,
      end_date: end_date,
      guide: 1,
      budget: budget,
    })
    .then((response) => response);
}
export function requestExpenses() {
  return axios
    .get("https://savr-travel.herokuapp.com/api/expenses/")
    .then((response) => response);
}

export function createExpense(title, trip, price, note, date, category) {
  return axios
    .post(
      "https://savr-travel.herokuapp.com/api/expenses/create/",
      {
        expense_title: title,
        trip: trip,
        // file: null,
        content: '',
        price: price,
        note: note,
        date: date,
        category: category,
      },
      {
        headers: {
        Authorization: 'Token 5d215d9f395661e65d6dd07690b64d8add42b738',
        "Content-Type": "application/json"
        },
      }
    )
    .then((response) => response);
}

export function getCurrentTripData(id) {
  return axios
    .get(`https://savr-travel.herokuapp.com/api/trip/${id}/`)
    .then((response) => response)
    .catch((error) => {
      console.log("Api call error");
      // alert(error.message);
    });
}

export function getAllTimeData() {
  return axios
    .get("https://savr-travel.herokuapp.com/api/accounts/summary/")
    .then((response) => response);
}


export function requestUserInfo (token) {
    return axios.get('https://savr-travel.herokuapp.com/auth/users/me/',
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response)
  }