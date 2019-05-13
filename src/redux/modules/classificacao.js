import { createAction, handleActions } from "redux-actions";
import _ from "lodash";

// ACTION TYPES
const FILTRAR_CLASSIFICACAO = `${process.env.PUBLIC_URL}/CLASSIFICACAO/FILTRAR_CLASSIFICACAO`;
const RESULTADO_FILTRAR_CLASSIFICACAO = `${process.env.PUBLIC_URL}/CLASSIFICACAO/RESULTADO_CARREGAR_CLASSIFICACAO`;
const ZERAR_FILTRO_CLASSIFICACAO = `${process.env.PUBLIC_URL}/CLASSIFICACAO/ZERAR_FILTRO_CLASSIFICACAO`;
const ADICIONAR_SELECIONADO = `${process.env.PUBLIC_URL}/CLASSIFICACAO/ADICIONAR_SELECIONADO`;
const REMOVE_SELECIONADA = `${process.env.PUBLIC_URL}/CLASSIFICACAO/REMOVE_SELECIONADA`;
const ZERAR_SELECIONADO = `${process.env.PUBLIC_URL}/CLASSIFICACAO/ZERAR_SELECIONADO`;

export const classificacaoTypes = {
    FILTRAR_CLASSIFICACAO,
    RESULTADO_FILTRAR_CLASSIFICACAO,
    ZERAR_FILTRO_CLASSIFICACAO,
    ADICIONAR_SELECIONADO,
    REMOVE_SELECIONADA,
    ZERAR_SELECIONADO
};

// ACTIONS
const filtrarClassificacao = createAction(FILTRAR_CLASSIFICACAO, payload => payload);
const resultadoFiltrarClassificacao = createAction(RESULTADO_FILTRAR_CLASSIFICACAO, payload => payload);
const zerarfiltroClassificacao = createAction(ZERAR_FILTRO_CLASSIFICACAO, payload => payload);
const adicionaSelecionado = createAction(ADICIONAR_SELECIONADO, payload => payload);
const removeSelecionada = createAction(REMOVE_SELECIONADA, payload => payload);
const zerarSelecionado = createAction(ZERAR_SELECIONADO);

export const classificacaoActions = {
    filtrarClassificacao,
    resultadoFiltrarClassificacao,
    zerarfiltroClassificacao,
    adicionaSelecionado,
    removeSelecionada,
    zerarSelecionado
};

// INITIAL STATE
const initialState = {
    sugeridas: [],
    selecionados: {}
}

// REDUCERS
const reducer = handleActions({
    [ZERAR_FILTRO_CLASSIFICACAO]: state => ({ ...state, sugeridas: [] }),
    [RESULTADO_FILTRAR_CLASSIFICACAO]: (state, action) => ({...state, sugeridas: action.payload}),
    [ADICIONAR_SELECIONADO]: (state, action) => ({
        ...state,
        selecionados: {
            ...state.selecionados,
            [action.payload.cdClasse]: {
                ...action.payload
            }
        }
    }),
    [REMOVE_SELECIONADA]: (state, action) => {
        const selecionados = Object.assign({}, state.selecionados);
        delete selecionados[action.payload.cdClasse];
        return { ...state, selecionados }
    },
    [ZERAR_SELECIONADO]: state => ({
        ...state,
        selecionados: {}
    })
}, initialState);

export default reducer;

// SELECTORS
const getClassificacoesSugeridas = state => _.values(state.classificacao.sugeridas || []);
const getClassificacoesSelecionadas = state => _.values(state.classificacao.selecionados || [])

export const classificacaoSelectors = {
    getClassificacoesSugeridas,
    getClassificacoesSelecionadas
};