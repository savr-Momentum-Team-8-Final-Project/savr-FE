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
  console.log(username);
  return axios
    .post("https://savr-travel.herokuapp.com/api/accounts/signup", {
      username: username,
      email: email,
      password: password,
      password2: password2,
    })
    .then((response) => response);
}
