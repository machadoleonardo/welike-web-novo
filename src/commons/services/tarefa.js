import axios from "../http/axios";

const FILTRAR_TAREFAS_PATH = "s/tarefa/tipo/consulta/filtro?query=";

export default {
  filtrarTarefas: payload => {
    return axios
      .get(FILTRAR_TAREFAS_PATH + payload)
      .then(res => res.data);
  }
};