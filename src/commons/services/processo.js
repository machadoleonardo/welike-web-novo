import axios from "../http/axios";

const FILTRAR_PROCESSO_PATH = "/s/processo/filtrar?filtroProcesso=";

export default {
  filtrarProcessos: payload => {
    return axios
      .get(FILTRAR_PROCESSO_PATH + payload)
      .then(res => res.data);
  }
};