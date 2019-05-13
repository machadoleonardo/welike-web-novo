import axios from "../http/axios";

const FILTRAR_CLASSIFICACOES_PATH = "s/classificacoes?query=";

export default {
  filtrarClassificacao: payload => {
    return axios
      .get(FILTRAR_CLASSIFICACOES_PATH + payload)
      .then(res => res.data);
  }
};