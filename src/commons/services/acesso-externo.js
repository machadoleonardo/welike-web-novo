import axios from "../http/axios";

const ACESSO_EXTERNO = "/s/liberacao-acesso-externo";

export default {
  liberarAcessoExterno: (payload) => {
    return axios
      .post(ACESSO_EXTERNO, payload)
      .then(res => res.data);
  },
  carregarAcessoExterno: (payload) => {
    return axios
      .get(ACESSO_EXTERNO + "?cdProcesso=" + payload, { responseType: "json" })
      .then(res => res.data);
  },
  cancelarAcessoExterno: (payload) => {
    return axios
      .put(ACESSO_EXTERNO + "/" + payload["cdLiberacaoAcessoExterno"] + "/cancelar", {})
      .then(res => res.data);
  },
  editarAcessoExterno: (payload) => {
    return axios
      .put(ACESSO_EXTERNO + "/" + payload["cdLiberacaoAcessoExterno"], payload)
      .then(res => res.data);
  }
};