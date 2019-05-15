import axios from '../http/axios';

export default {
  carregar: payload => {
    return axios
      .post(`/s/fila-processo-tarefa`, payload)
      .then(res => { return res.data; });
  },

  getTarefaJaAtribuida: payload => {
    return axios
      .get('/s/processo-tarefa/tarefa/validacao/' + payload, { data: {} })
    .then(res =>  res.data )
  },

  atribuirTarefa: payload => {
    return axios
    .post(`/s/processo-tarefa/atribuicao`, [payload] )
    .then(res => { return res.data; })
  },

  desatribuirTarefa: payload => {
    return axios
    .delete(`/s/processo-tarefa/atribuicao`, {data: [payload]})
    .then(res => { return res.data; })
  },
}
