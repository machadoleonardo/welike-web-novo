import axios from "../http/axios";

const LISTAR_INTERESSADOS_PROCESSO_PATH = "/s/interessado/processo/";
const FILTRAR_INTERESSADOS_PATH = "/s/interessado?query=";

export default {
  carregarInteressados: (payload) => {
    return axios
      .get(LISTAR_INTERESSADOS_PROCESSO_PATH + payload)
      .then(res => res.data);
  },
  filtrarInteressados: (payload) => {
    return axios
      .get(FILTRAR_INTERESSADOS_PATH + payload)
      .then(res => res.data);
  }
};