import _ from 'lodash';
import { createAction, handleActions } from 'redux-actions';

// ACTION TYPES
const USUARIO_CONSULTAR = `${process.env.PUBLIC_URL}/USUARIO/CONSULTA`;
const USUARIO_ATUALIZAR_STORE = `${process.env.PUBLIC_URL}/USUARIO/UPDATE_STORE`;
const USUARIO_REMOVER_STORE = `${process.env.PUBLIC_URL}/USUARIO/REMOVE_STORE`;

const FILTRAR_USUARIO = `${process.env.PUBLIC_URL}/USUARIO/FILTRAR_USUARIO`;
const RESULTADO_FILTRAR_USUARIO = `${process.env.PUBLIC_URL}/USUARIO/RESULTADO_CARREGAR_USUARIO`;
const ZERAR_FILTRO_USUARIO = `${process.env.PUBLIC_URL}/USUARIO/ZERAR_FILTRO_USUARIO`;

export const usuarioTypes = {
  USUARIO_CONSULTAR,
  USUARIO_ATUALIZAR_STORE,
  USUARIO_REMOVER_STORE,
  FILTRAR_USUARIO,
  RESULTADO_FILTRAR_USUARIO,
  ZERAR_FILTRO_USUARIO
};

// ACTIONS
const consultarUsuario = createAction(USUARIO_CONSULTAR);
const atualizarUsuarioStore = createAction(USUARIO_ATUALIZAR_STORE);
const removerUsuarioStore = createAction(USUARIO_REMOVER_STORE);

const filtrarUsuario = createAction(FILTRAR_USUARIO, payload => payload);
const resultadoFiltrarUsuario = createAction(RESULTADO_FILTRAR_USUARIO, payload => payload);
const zerarfiltroUsuario = createAction(ZERAR_FILTRO_USUARIO, payload => payload);

export const usuarioActions = {
  consultarUsuario,
  atualizarUsuarioStore,
  removerUsuarioStore,
  filtrarUsuario,
  resultadoFiltrarUsuario,
  zerarfiltroUsuario
};

// INITIAL STATE
const initialState = {
  sugeridos: []
};

// REDUCERS
const reducer = handleActions({
  [USUARIO_ATUALIZAR_STORE]: (state, action) => {
    const { payload } = action;
    const telas = _.chain(payload.permissions)
      .filter(p => _.startsWith(p, '/CPA-FRONTEND/'))
      .map(p => _.replace(p, '/CPA-FRONTEND/', '/'))
      .map(p => _.replace(p, '?A=.DO', ''))
      .value();

    const usuario = {
      codigo: payload.userName,
      perfis: payload.grupos,
      telas: telas,
    }

    return { ...state, ...usuario };
  },
  [USUARIO_REMOVER_STORE]: () => initialState,
  [ZERAR_FILTRO_USUARIO]: state => ({ ...state, sugeridos: [] }),
  [RESULTADO_FILTRAR_USUARIO]: (state, action) => ({...state, sugeridos: action.payload})
}, initialState);

export default reducer;

// SELECTORS
const getUsuario = state => state.usuario;
const getUsuarioSugeridos = state => _.values(state.usuario.sugeridos.itens || []);

const isPossuiAcessoTela = (state, tela) => {
  // TODO: Implementar ACL
  return true;
  // if (!Boolean(state.usuario)) {
  //   return false;
  // }
  // return _.includes(state.usuario.telas, _.toUpper(tela));
};

export const usuarioSelectors = {
  getUsuario,
  getUsuarioSugeridos,
  isPossuiAcessoTela,
};