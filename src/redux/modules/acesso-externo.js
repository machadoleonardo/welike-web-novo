import { createAction, handleActions } from "redux-actions";
import _ from "lodash";

// ACTION TYPES
/* Enviar pedido de liberacao de acesso externo */
const LIBERAR_ACESSO_EXTERNO = `${process.env.PUBLIC_URL}/ACESSO_EXTERNO/LIBERAR-ACESSO-EXTERNO`;
/* Gestao de Acesso */
const CARREGAR_ACESSO_LIBERADOS = `${process.env.PUBLIC_URL}/ACESSO_EXTERNO/CARREGAR-ACESSO-EXTERNO`;
const CANCELAR_ACESSO_LIBERADOS = `${process.env.PUBLIC_URL}/ACESSO_EXTERNO/CANCELAR-ACESSO-EXTERNO`;
const EDITAR_ACESSO_LIBERADOS = `${process.env.PUBLIC_URL}/ACESSO_EXTERNO/EDITAR-ACESSO-EXTERNO`;
const RESULTADO_CARREGAR_ACESSO_LIBERADOS = `${process.env.PUBLIC_URL}/ACESSO_EXTERNO/RESULTADO-CARREGAR-ACESSO-EXTERNO`;

export const acessoExternoTypes = {
  LIBERAR_ACESSO_EXTERNO,
  CARREGAR_ACESSO_LIBERADOS,
  CANCELAR_ACESSO_LIBERADOS,
  EDITAR_ACESSO_LIBERADOS,
  RESULTADO_CARREGAR_ACESSO_LIBERADOS
};

// ACTIONS
const liberarAcessoExterno = createAction(LIBERAR_ACESSO_EXTERNO, payload => payload);

const carregarAcessoExterno = createAction(CARREGAR_ACESSO_LIBERADOS, payload => payload);
const cancelarAcessoExterno = createAction(CANCELAR_ACESSO_LIBERADOS, payload => payload);
const editarAcessoExterno = createAction(EDITAR_ACESSO_LIBERADOS, payload => payload);
const resultadoCarregarAcessoExterno = createAction(RESULTADO_CARREGAR_ACESSO_LIBERADOS, payload => payload);

export const acessoExternoActions = {
  liberarAcessoExterno,
  carregarAcessoExterno,
  cancelarAcessoExterno,
  editarAcessoExterno,
  resultadoCarregarAcessoExterno
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
  [RESULTADO_CARREGAR_ACESSO_LIBERADOS]: (state, action) => {
    return { ...state, acessosLiberados: action.payload };
  }
}, initialState);

export default reducer;

// SELECTORS
const getAcessosLiberados = (state) => {
  return _.values(state.pasta.acessosLiberados || []);
};

export const acessoExternoSelectors = {
  getAcessosLiberados
};