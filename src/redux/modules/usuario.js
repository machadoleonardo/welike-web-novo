import {createAction, handleActions} from 'redux-actions';
import _ from "lodash";
import {getSessionStorage, setSessionStorage} from "../../commons/helpers/storage-helper";

// ACTION TYPES
const LOGIN = `${process.env.PUBLIC_URL}/USUARIO/LOGIN`;
const ATUALIZAR_TOKEN = `${process.env.PUBLIC_URL}/USUARIO/ATUALIZAR_TOKEN`;

export const usuarioTypes = {
    LOGIN,
    ATUALIZAR_TOKEN,
};

// ACTIONS
const login = createAction(LOGIN);
const atualizarToken = createAction(ATUALIZAR_TOKEN);

export const usuarioActions = {
    login,
    atualizarToken,
};

// INITIAL STATE
const initialState = {
    token: null,
};

// REDUCERS
const reducer = handleActions({
    [ATUALIZAR_TOKEN]: (state, action) => {
        setSessionStorage("token", action.payload);
        return {...state};
    },
}, initialState);

export default reducer;

// SELECTORS
const isPossuiAcessoTela = (state, tela) => {
    // TODO: Implementar ACL
    return true;
};

const isLogged = state => !_.isNil(getSessionStorage("token"));

export const usuarioSelectors = {
    isPossuiAcessoTela,
    isLogged,
};