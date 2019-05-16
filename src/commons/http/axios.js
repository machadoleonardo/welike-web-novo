import axios from 'axios';

axios.defaults.baseURL = `/`;

export default axios;

export const registerAxiosInterceptors = (store) => {
  axios.interceptors.request.use(config => {
        config.headers = config.headers || {};
        return config;
      },
  error => Promise.reject(error)
  );

  axios.interceptors.response.use(
      // success
      response => response,

      // error
      (error) => {
        return Promise.reject(error);
      });
};