import axios from '../http/axios';

const URL_DEFAULT = "login";

export default {
  login: async (parameters) => {
    const response = await axios.post(URL_DEFAULT, parameters);
    return response.data;
  }
};