import _ from "lodash";
import { createAction, handleActions } from "redux-actions";

// ACTION TYPES
const CARREGAR_INTERESSADOS = `${
  process.env.PUBLIC_URL
}/INTERESSADO/CARREGAR-INTERESSADOS`;
const RESULTADO_CARREGAR_INTERESSADOS = `${
  process.env.PUBLIC_URL
}/INTERESSADO/RESULTADO-CARREGAR-INTERESSADOS`;
const RESULTADO_REMOVER_INTERESSADOS = `${
  process.env.PUBLIC_URL
}/INTERESSADO/RESULTADO-REMOVER-INTERESSADOS`;
const FILTRAR_INTERESSADOS = `${
  process.env.PUBLIC_URL
}/INTERESSADO/FILTRAR-INTERESSADOS`;
const ZERAR_FILTRO_INTERESSADOS = `${
  process.env.PUBLIC_URL
}/INTERESSADO/ZERAR-FILTRO-INTERESSADOS`;

const ADICIONAR_INTERESSADOS_SELECIONADOS = `${
  process.env.PUBLIC_URL
}/INTERESSADO/ADICIONAR-INTERESSADOS-SELECIONADOS`;
const REMOVER_INTERESSADOS_SELECIONADOS = `${
  process.env.PUBLIC_URL
}/INTERESSADO/REMOVER-INTERESSADOS-SELECIONADOS`;
const RESULTADO_FILTRAR_INTERESSADOS = `${
  process.env.PUBLIC_URL
}/INTERESSADO/RESULTADO-FILTRAR-INTERESSADOS`;

const ADICIONAR_SELECIONADO = `${
  process.env.PUBLIC_URL
}/INTERESSADO/ADICIONAR_SELECIONADO`;
const REMOVE_SELECIONADO = `${
  process.env.PUBLIC_URL
}/INTERESSADO/REMOVE_SELECIONADO`;
const ZERAR_SELECIONADO = `${
  process.env.PUBLIC_URL
}/INTERESSADO/ZERAR_SELECIONADO`;

export const interessadoTypes = {
  CARREGAR_INTERESSADOS,
  RESULTADO_CARREGAR_INTERESSADOS,
  FILTRAR_INTERESSADOS,
  ZERAR_FILTRO_INTERESSADOS,
  ADICIONAR_INTERESSADOS_SELECIONADOS,
  REMOVER_INTERESSADOS_SELECIONADOS,
  RESULTADO_FILTRAR_INTERESSADOS,
  RESULTADO_REMOVER_INTERESSADOS,
  ADICIONAR_SELECIONADO,
  REMOVE_SELECIONADO,
  ZERAR_SELECIONADO
};

// ACTIONS
const carregarInteressados = createAction(
  CARREGAR_INTERESSADOS,
  payload => payload
);
const resultadoCarregarInteressados = createAction(
  RESULTADO_CARREGAR_INTERESSADOS,
  payload => payload
);
const filtrarInteressados = createAction(
  FILTRAR_INTERESSADOS,
  payload => payload
);
const zerarFiltroInteressados = createAction(
  ZERAR_FILTRO_INTERESSADOS,
  payload => payload
);

const adicionarInteressadosSelecionados = createAction(
  ADICIONAR_INTERESSADOS_SELECIONADOS,
  payload => payload
);
const removerInteressadosSelecionados = createAction(
  REMOVER_INTERESSADOS_SELECIONADOS,
  payload => payload
);
const resultadoRemoverInteressados = createAction(
  RESULTADO_REMOVER_INTERESSADOS,
  payload => payload
);
const resultadoFiltrarInteressados = createAction(
  RESULTADO_FILTRAR_INTERESSADOS,
  payload => payload
);

const adicionaSelecionado = createAction(
  ADICIONAR_SELECIONADO,
  payload => payload
);
const removeSelecionado = createAction(REMOVE_SELECIONADO, payload => payload);
const zerarSelecionado = createAction(ZERAR_SELECIONADO);

export const interessadoActions = {
  carregarInteressados,
  resultadoCarregarInteressados,
  filtrarInteressados,
  zerarFiltroInteressados,
  adicionarInteressadosSelecionados,
  removerInteressadosSelecionados,
  resultadoRemoverInteressados,
  resultadoFiltrarInteressados,

  adicionaSelecionado,
  removeSelecionado,
  zerarSelecionado
};

// INITIAL STATE
const initialState = {
  processosSugeridos: [],
  interessados: [],
  interessadosSugeridos: [],
  acessosLiberados: [],
  selecionados: {}
};

// REDUCERS
const reducer = handleActions(
  {
    [RESULTADO_CARREGAR_INTERESSADOS]: (state, action) => {
      let interessadosSelecionados = [];
      if (!_.isEmpty(action.payload)) {
        interessadosSelecionados = [...state.interessados, ...action.payload];
      }
      return {
        ...state,
        interessados: _.uniqBy(interessadosSelecionados, "cdInteressado")
      };
    },

    [RESULTADO_REMOVER_INTERESSADOS]: (state, action) => {
      _.remove(state.interessados, obj => {
        return obj["email"] === action.payload.item["email"];
      });
      return { ...state };
    },

    [RESULTADO_FILTRAR_INTERESSADOS]: (state, action) => {
      return { ...state, interessadosSugeridos: action.payload };
    },

    [ADICIONAR_SELECIONADO]: (state, action) => ({
      ...state,
      selecionados: {
        ...state.selecionados,
        [action.payload.cdInteressado]: {
          ...action.payload
        }
      }
    }),

    [REMOVE_SELECIONADO]: (state, action) => {
      const selecionados = Object.assign({}, state.selecionados);
      delete selecionados[action.payload.cdInteressado];
      return { ...state, selecionados };
    },

    [ZERAR_SELECIONADO]: state => ({
      ...state,
      selecionados: {}
    })
  },
  initialState
);

export default reducer;

// SELECTORS
const getInteressadosSelecionados = state => state.interessado.interessados;
const getInteressadosSugeridos = state =>
  state.interessado.interessadosSugeridos;
const getSelecionados = state => _.values(state.interessado.selecionados || []);

export const interessadoSelectors = {
  getInteressadosSelecionados,
  getInteressadosSugeridos,
  getSelecionados
};
