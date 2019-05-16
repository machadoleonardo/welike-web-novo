import axios from '../http/axios';

const LOGIN = "login";

export default {
  login: async (parameters) => {
    const response = await axios.post(LOGIN, parameters);
    return response.data;
  }
};