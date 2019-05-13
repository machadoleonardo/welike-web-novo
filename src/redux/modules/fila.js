import _ from 'lodash';
import moment from 'moment';
import { createAction, handleActions } from 'redux-actions';

// ACTION TYPES
const ATIVAR = `${process.env.PUBLIC_URL}/FILA/ATIVAR`;
const TOOGLE_ATIVO = `${process.env.PUBLIC_URL}/FILA/TOOGLE_ATIVO`;
const TOOGLE_TAREFA = `${process.env.PUBLIC_URL}/FILA/TOOGLE_TAREFA`;
const CARREGAR = `${process.env.PUBLIC_URL}/FILA/CARREGAR`;
const ATUALIZAR_STORE = `${process.env.PUBLIC_URL}/FILA/ATUALIZAR_STORE`;
const ATUALIZAR_PROCESSO = `${process.env.PUBLIC_URL}/FILA/ATUALIZAR_PROCESSO`;
const ATUALIZAR_STORE_PROCESSO = `${process.env.PUBLIC_URL}/FILA/ATUALIZAR_STORE_PROCESSO`;
const REMOVER_PROCESSO = `${process.env.PUBLIC_URL}/FILA/REMOVER_PROCESSO`;
const FILTRAR_PROCESSO = `${process.env.PUBLIC_URL}/FILA/FILTRAR_PROCESSO`;
const ATUALIZAR_ATRIBUICAO_DESATRIBUICAO = `${process.env.PUBLIC_URL}/FILA/ATUALIZAR_ATRIBUICAO_DESATRIBUICAO `;
const ATRIBUIR_TAREFA = `${process.env.PUBLIC_URL}/FILA/ATRIBUIR_TAREFA`;
const DESATRIBUIR_TAREFA = `${process.env.PUBLIC_URL}/FILA/DESATRIBUIR_TAREFA`;
const SET_ERRO_ATRIBUICAO_DESATRIBUICAO = `${process.env.PUBLIC_URL}/FILA/SET_ERRO_ATRIBUICAO_DESATRIBUICAO`;
const SET_TAREFA_ATRIBUIDA = `${process.env.PUBLIC_URL}/FILA/SET_TAREFA_ATRIBUICAO`;
const SET_TAREFA_DESATRIBUIDA = `${process.env.PUBLIC_URL}/FILA/SET_TAREFA_DESATRIBUIDA`;
const SET_TAREFA_STATUS_ATRIBUICAO = `${process.env.PUBLIC_URL}/FILA/SET_TAREFA_STATUS_ATRIBUICAO`;
const SET_TAREFA_JA_ATRIBUIDA_OUTRO_USUARIO = `${process.env.PUBLIC_URL}/FILA/SET_TAREFA_JA_ATRIBUIDA_OUTRO_USUARIO`;
const SET_TAREFA_NAO_ATRIBUIDA_OUTRO_USUARIO = `${process.env.PUBLIC_URL}/FILA/SET_TAREFA_NAO_ATRIBUIDA_OUTRO_USUARIO`;

export const filaTypes = {
  ATIVAR,
  TOOGLE_ATIVO,
  TOOGLE_TAREFA,
  CARREGAR,
  ATUALIZAR_STORE,
  ATUALIZAR_PROCESSO,
  ATUALIZAR_STORE_PROCESSO,
  REMOVER_PROCESSO,
  FILTRAR_PROCESSO,
  ATUALIZAR_ATRIBUICAO_DESATRIBUICAO,
  ATRIBUIR_TAREFA,
  DESATRIBUIR_TAREFA,
  SET_ERRO_ATRIBUICAO_DESATRIBUICAO,
  SET_TAREFA_ATRIBUIDA,
  SET_TAREFA_DESATRIBUIDA,
  SET_TAREFA_STATUS_ATRIBUICAO,
  SET_TAREFA_JA_ATRIBUIDA_OUTRO_USUARIO,
  SET_TAREFA_NAO_ATRIBUIDA_OUTRO_USUARIO
};

// ACTIONS
const ativar = createAction(ATIVAR);
const toogleAtivo = createAction(TOOGLE_ATIVO);
const toogleTarefa = createAction(TOOGLE_TAREFA);
const carregar = createAction(CARREGAR, payload => payload, () => ({ preserve: true }));
const recarregar = createAction(CARREGAR, payload => payload, () => ({ preserve: false }));
const filtrar = createAction(FILTRAR_PROCESSO, payload => payload, () => ({ preserve: true }));
const atualizarStore = createAction(ATUALIZAR_STORE);
const atualizarProcesso = createAction(ATUALIZAR_PROCESSO);
const atualizarStoreProcesso = createAction(ATUALIZAR_STORE_PROCESSO);
const removerProcesso = createAction(REMOVER_PROCESSO);
const atualizarAtribuicaoDesatribuicao = createAction(ATUALIZAR_ATRIBUICAO_DESATRIBUICAO);
const atribuirTarefa = createAction(ATRIBUIR_TAREFA, payload => payload);
const desatribuirTarefa = createAction(DESATRIBUIR_TAREFA);
const setErroAtribuicaoDesatribuicao = createAction(SET_ERRO_ATRIBUICAO_DESATRIBUICAO);
const setTarefaAtribuida = createAction(SET_TAREFA_ATRIBUIDA);
const setTarefaDesatribuida = createAction(SET_TAREFA_DESATRIBUIDA);
const setTarefaStatusAtribuicao = createAction(SET_TAREFA_STATUS_ATRIBUICAO);
const setTarefaJaAtribuidaOutroUsuario = createAction(SET_TAREFA_JA_ATRIBUIDA_OUTRO_USUARIO);
const setTarefaNaoAtribuidaOutroUsuario = createAction(SET_TAREFA_NAO_ATRIBUIDA_OUTRO_USUARIO);



export const filaActions = {
  ativar,
  toogleAtivo,
  toogleTarefa,
  carregar,
  recarregar,
  filtrar,
  atualizarStore,
  atualizarProcesso,
  atualizarStoreProcesso,
  removerProcesso,
  atualizarAtribuicaoDesatribuicao,
  atribuirTarefa,
  desatribuirTarefa,
  setErroAtribuicaoDesatribuicao,
  setTarefaAtribuida,
  setTarefaDesatribuida,
  setTarefaStatusAtribuicao,
  setTarefaJaAtribuidaOutroUsuario,
  setTarefaNaoAtribuidaOutroUsuario
};

// INITIAL STATE
const initialState = {};

const processarTarefas = (tarefas, today) => {
  _.each(tarefas, t => {

    if (t.usuarioAtribuicao && Boolean(t.usuarioAtribuicao.codigo)) {
      t.atribuicao = { isTarefaAtribuida: true }
    } else {
      t.atribuicao = { isTarefaAtribuida: false }
    }

    t.atribuicao.tarefaJaAtribuidaAoutroUsuario = false;
    t.atribuicao.isErrorAtribuirDesatribuir = null;
    t.vencida = today.isAfter(moment(t.prazo, 'DD/MM/YYYY'));
  })
}

// REDUCERS
const reducer = handleActions({
  [ATUALIZAR_STORE]: (state, action) => {
    const today = moment().startOf('day');

    // processando a resposta
    _.each(action.payload.processos, p => {
      processarTarefas(p.tarefas, today);
    });

    const { possuiMaisItens, preserve } = action.payload;

    // convertendo de array para object
    const processos = _.merge(preserve ? state.processos : {}, _.keyBy(action.payload.processos, processo => processo.codigo));

    if (preserve) {
      return {
        ...state,
        processos: processos,
        possuiMaisItens: possuiMaisItens
      };
    }

    return {
      processos: processos,
      possuiMaisItens: possuiMaisItens
    };
  },

  [ATUALIZAR_STORE_PROCESSO]: (state, action) => {
    const today = moment().startOf('day');
    const { codigo, processo } = action.payload;
    const antigo = Object.assign({}, state.processos[codigo]);

    if (!processo) {
      // o processo não está mais na fila do usuário
      antigo.tarefas = [];
      antigo.habilitaRemoverDaFila = true;
    } else {
      // o processo ainda está na fila do usuário, manter propriedades atuais
      processo.toggleTarefa = antigo.toggleTarefa;
    }

    const atualizado = processo || antigo;

    processarTarefas(atualizado.tarefas, today);

    state.processos[codigo] = atualizado;

    return { ...state };
  },

  [REMOVER_PROCESSO]: (state, action) => {
    const processo = action.payload.processo;
    const processos = _.omit(state.processos, [processo]);

    return {
      ...state,
      selecionado: state.selecionado !== processo ? state.selecionado : null,
      processos: processos
    };
  },

  [ATIVAR]: (state, action) => {
    return { ...state, ativo: action.payload.codigo || state.ativo };
  },

  [TOOGLE_ATIVO]: (state, action) => {
    const { processo, visualizacao } = action.payload;
    const ativo = (processo && processo.codigo) || state.ativo;
    const view = visualizacao || state.visualizacao;

    return { ...state, expadido: !state.expadido, ativo: ativo, visualizacao: view };
  },

  [TOOGLE_TAREFA]: (state, action) => {
    state.processos[action.payload]["toggleTarefa"] = !state.processos[action.payload]["toggleTarefa"];
    state.processos[action.payload] = Object.assign({}, state.processos[action.payload]);

    return { ...state };
  },

  [ATUALIZAR_ATRIBUICAO_DESATRIBUICAO]: (state, action) => {
    const { tarefa, usuario } = action.payload;
    const { processo, codigo } = tarefa;
    const tarefas = state.processos[processo].tarefas;
    let mapTarefas = [];

    if (_.isEmpty(usuario)) {
      mapTarefas = tarefas.map((tarefa) => {
        if (tarefa.codigo === codigo)
          tarefa.usuarioAtribuicao = { codigo: null, nome: null };
        return tarefa;
      })
    } else {
      mapTarefas = tarefas.map((tarefa) => {
        if (tarefa.codigo === codigo)
          tarefa.usuarioAtribuicao = { codigo: usuario.codigo };
        return tarefa;
      });
    }

    state.processos[processo].tarefas = mapTarefas;

    return { ...state }
  },

  [SET_ERRO_ATRIBUICAO_DESATRIBUICAO]: (state, action) => {
    let { tarefa } = action.payload;

    let newState = _.cloneDeep(state);

    const { processo } = tarefa;
    const tarefas = newState.processos[processo].tarefas;

    let tarefaAserModificada = tarefas.find((t) => t.codigo === tarefa.codigo);
    tarefaAserModificada.atribuicao.isErrorAtribuirDesatribuir = true;
    return newState;
  },

  [SET_TAREFA_ATRIBUIDA]: (state, action) => {
    const { tarefa } = action.payload;
    const { processo } = tarefa;

    let newState = _.cloneDeep(state);

    const tarefas = newState.processos[processo].tarefas;

    let tarefaAserModificada = tarefas.find((t) => t.codigo === tarefa.codigo);
    tarefaAserModificada.atribuicao.isTarefaAtribuida = true;
    tarefaAserModificada.atribuicao.isErrorAtribuirDesatribuir = false;

    return newState;
  },

  [SET_TAREFA_DESATRIBUIDA]: (state, action) => {
    const { tarefa } = action.payload;
    const { processo } = tarefa;

    let anotherState = _.cloneDeep(state);
    const tarefas = anotherState.processos[processo].tarefas;
    let tarefaAserModificada = tarefas.find((t) => t.codigo === tarefa.codigo);

    tarefaAserModificada.atribuicao.isTarefaAtribuida = false;
    tarefaAserModificada.atribuicao.isErrorAtribuirDesatribuir = false;

    return anotherState;
  },
  [SET_TAREFA_STATUS_ATRIBUICAO]: (state, action) => {
    let anotherState = _.cloneDeep(state);
    return anotherState;
  },
  [SET_TAREFA_JA_ATRIBUIDA_OUTRO_USUARIO]: (state, action) => {
    
    const { tarefa } = action.payload;
    const { processo } = tarefa;

    let newState = _.cloneDeep(state);

    const tarefas = newState.processos[processo].tarefas;

    let tarefaAserModificada = tarefas.find((t) => t.codigo === tarefa.codigo);
    tarefaAserModificada.atribuicao.tarefaJaAtribuidaAoutroUsuario = true;
    tarefaAserModificada.atribuicao.isErrorAtribuirDesatribuir = false;

    return newState;

  },
  [SET_TAREFA_NAO_ATRIBUIDA_OUTRO_USUARIO]: (state, action) => {
    
    const { tarefa } = action.payload;
    const { processo } = tarefa;

    let newState = _.cloneDeep(state);

    const tarefas = newState.processos[processo].tarefas;

    let tarefaAserModificada = tarefas.find((t) => t.codigo === tarefa.codigo);
    tarefaAserModificada.atribuicao.tarefaJaAtribuidaAoutroUsuario = false;
    tarefaAserModificada.atribuicao.isErrorAtribuirDesatribuir = false;

    return newState;

  }
}, initialState);

export default reducer;

// SELECTORS
const getProcessos = (state) => {
  return _.values(state.fila.processos || {});
};

const isPossuiMaisItens = (state) => {
  return state.fila.possuiMaisItens;
};

const isViewProcessoExpadido = (state) => {
  return state.fila.expadido;
};

const getProcessoAtivo = (state) => {
  const { ativo, processos } = state.fila;
  if (!Boolean(ativo)) {
    return undefined;
  }

  return processos[ativo];
};

const getFlagAtivo = (state) => {
  return state.fila.ativo;
}

const getVisualizacaoAtivo = (state) => {
  const { visualizacao } = state.fila;
  if (!Boolean(visualizacao)) {
    return undefined;
  }

  return visualizacao;
};

const getQtTarefasAberta = (state, codigoProcesso) => {
  let tarefas = state.fila.processos[codigoProcesso].tarefas || [];
  return _.size(tarefas);
};

const getQtTarefasFazendo = (state, codigoProcesso) => {
  let tarefas = state.fila.processos[codigoProcesso].tarefas || [];
  return _.reduce(tarefas, (result, t) => { return result + (Boolean(t.usuarioAtribuicao && t.usuarioAtribuicao.codigo) ? 1 : 0) }, 0);
};

const getQtTarefasFazer = (state, codigoProcesso) => {
  return getQtTarefasAberta(state, codigoProcesso) - getQtTarefasFazendo(state, codigoProcesso);
};

const getFlVencida = (state, codigoProcesso) => {
  let tarefas = state.fila.processos[codigoProcesso].tarefas || [];
  return _.reduce(tarefas, (result, t) => { return result || t.vencida; }, false);
};

const isTarefaAtribuida = (state, tarefa) => tarefa.atribuicao.isTarefaAtribuida;

const isTarefaJaAtribuidaAoutroUsuario = (tarefa) => (state) => {
const tarefaAserModificada = state.fila.processos[tarefa.processo].tarefas.find(t => t.codigo === tarefa.codigo)
return tarefaAserModificada.atribuicao.tarefaJaAtribuidaAoutroUsuario;
}


export const filaSelectors = {
  getProcessos,
  isPossuiMaisItens,
  isViewProcessoExpadido,
  getProcessoAtivo,
  getFlagAtivo,
  getVisualizacaoAtivo,
  getQtTarefasAberta,
  getQtTarefasFazendo,
  getQtTarefasFazer,
  getFlVencida,
  isTarefaAtribuida,
  isTarefaJaAtribuidaAoutroUsuario
};