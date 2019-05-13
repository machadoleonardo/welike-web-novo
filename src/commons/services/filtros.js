import axios from '../http/axios';

const FILTROS_PATH = "/s/fila-processo-tarefa";

export default {  
  buscarPorPalavra: payload => {
    return axios
      .get(FILTROS_PATH)
      .then(res => res.data );
  },
  aplicarFiltros: payload => {
    return axios
      .post(FILTROS_PATH, payload)
      .then(res => res.data);
  },
};