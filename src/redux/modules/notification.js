import {createAction, handleActions} from 'redux-actions';

// ACTION TYPES
const ATUALIZAR_STATE = `${process.env.PUBLIC_URL}/NOTIFICACAO/BUSCAR_NOTIFICACOES`;
const ATUALIZAR_NOTIFICACOES = `${process.env.PUBLIC_URL}/NOTIFICACAO/ATUALIZAR_NOTIFICACOES`;

export const notificationTypes = {
    ATUALIZAR_STATE,
    ATUALIZAR_NOTIFICACOES,
};

// ACTIONS
const atualizarState = createAction(ATUALIZAR_STATE);
const atualizarNotificacoes = createAction(ATUALIZAR_NOTIFICACOES);

export const noticationActions = {
    atualizarState,
    atualizarNotificacoes,
};

// INITIAL STATE
const initialState = {
    notificacoes: []
};

// REDUCERS
const reducer = handleActions({
    [ATUALIZAR_STATE]: (state, action) => {
        const notificacoes = {
            "campaigns": action.payload
        };
        return {...state, notificacoes};
    },
}, initialState);

export default reducer;

// SELECTORS
const getCampaigns = (state) => {
    if (state.notificacoes && state.notificacoes.notificacoes) {
        return state.notificacoes.notificacoes.campaigns;
    } else {
        return {};
    }
};

export const notificationSelectors = {
    getCampaigns,
};