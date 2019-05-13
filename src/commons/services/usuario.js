import axios from '../http/axios';

const FILTRAR_USARIOS_PATH = "s/usuarios?query=";

export default {
  consultar: () => {
    return axios
      .get('/s/principal')
      .then(res => res.data);
  },
  filtrarUsuario: payload => {
    return axios
      .get(FILTRAR_USARIOS_PATH + payload)
      .then(res => res.data);
  }
};