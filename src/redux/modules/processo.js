import { createAction, handleActions } from "redux-actions";
import _ from "lodash";

// ACTION TYPES
const ZERAR_FILTRO_PROCESSOS = `${process.env.PUBLIC_URL}/PROCESSO/ZERAR-FILTRO-PROCESSOS`;
const FILTRAR_PROCESSOS = `${process.env.PUBLIC_URL}/PROCESSO/FILTRAR-PROCESSOS`;
const RESULTADO_FILTRAR_PROCESSOS = `${process.env.PUBLIC_URL}/PROCESSO/RESULTADO-CARREGAR-PROCESSOS`;

export const processoTypes = {
  FILTRAR_PROCESSOS,
  ZERAR_FILTRO_PROCESSOS,
  RESULTADO_FILTRAR_PROCESSOS,
};

// ACTIONS
const filtrarProcessos = createAction(FILTRAR_PROCESSOS, payload => payload);
const zerarfiltroProcessos = createAction(ZERAR_FILTRO_PROCESSOS, payload => payload);
const resultadoFiltrarProcessos = createAction(RESULTADO_FILTRAR_PROCESSOS, payload => payload);

export const processoActions = {
  filtrarProcessos,
  resultadoFiltrarProcessos,
  zerarfiltroProcessos,
};

// INITIAL STATE
const initialState = {
  processosSugeridos: [],
  interessadosProcesso: [],
  interessadosSugeridos: [],
  acessosLiberados: []
};

// REDUCERS
const reducer = handleActions({
  [ZERAR_FILTRO_PROCESSOS]: (state, action) => {
    return { ...state, processosSugeridos: [] };
  },
  [RESULTADO_FILTRAR_PROCESSOS]: (state, action) => {
    return { ...state, processosSugeridos: action.payload };
  }
}, initialState);

export default reducer;

// SELECTORS
const getProcessosSugeridos = (state) => {
  return _.values(state.processo.processosSugeridos || []);
};

export const processoSelectors = {
  getProcessosSugeridos,
};