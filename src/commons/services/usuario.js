import axios from '../http/axios';

const LOGIN = "login";

export default {
  login: (user, password) => {
    return axios
      .post(LOGIN)
      .then(res => res.data);
  }
};