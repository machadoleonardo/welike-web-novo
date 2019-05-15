import {createAction, handleActions} from 'redux-actions';
import _ from "lodash";

// ACTION TYPES
const LOGIN = `${process.env.PUBLIC_URL}/USUARIO/LOGIN`;

export const usuarioTypes = {
  LOGIN,
};

// ACTIONS
const login = createAction(LOGIN);

export const usuarioActions = {
  login,
};

// INITIAL STATE
const initialState = {
  token: null,
};

// REDUCERS
const reducer = handleActions({
  [LOGIN]: (state, action) => {
    return { ...state, token: action.payload };
  },
}, initialState);

export default reducer;

// SELECTORS
const isPossuiAcessoTela = (state, tela) => {
  // TODO: Implementar ACL
  return true;
};

const isLogged = state => !_.isNil(state.token);

export const usuarioSelectors = {
  isPossuiAcessoTela,
  isLogged,
};