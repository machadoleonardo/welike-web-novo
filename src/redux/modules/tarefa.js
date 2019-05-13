import { createAction, handleActions } from "redux-actions";
import _ from "lodash";

// ACTION TYPES
const FILTRAR_TAREFA = `${process.env.PUBLIC_URL}/TAREFA/FILTRAR_TAREFA`;
const RESULTADO_FILTRAR_TAREFA = `${process.env.PUBLIC_URL}/TAREFA/RESULTADO_CARREGAR_TAREFA`;
const ZERAR_FILTRO_TAREFA = `${process.env.PUBLIC_URL}/TAREFA/ZERAR_FILTRO_TAREFA`;
const ADICIONAR_SELECIONADO = `${process.env.PUBLIC_URL}/TAREFA/ADICIONAR_SELECIONADO`;
const REMOVE_SELECIONADA = `${process.env.PUBLIC_URL}/TAREFA/REMOVE_SELECIONADA`;
const ZERAR_SELECIONADO = `${process.env.PUBLIC_URL}/TAREFA/ZERAR_SELECIONADO`;

export const tarefaTypes = {
    FILTRAR_TAREFA,
    RESULTADO_FILTRAR_TAREFA,
    ZERAR_FILTRO_TAREFA,
    ADICIONAR_SELECIONADO,
    REMOVE_SELECIONADA,
    ZERAR_SELECIONADO
};

// ACTIONS
const filtrarTarefa = createAction(FILTRAR_TAREFA, payload => payload);
const resultadoFiltrarTarefa = createAction(RESULTADO_FILTRAR_TAREFA, payload => payload);
const zerarfiltroTarefa = createAction(ZERAR_FILTRO_TAREFA, payload => payload);
const adicionaSelecionado = createAction(ADICIONAR_SELECIONADO, payload => payload);
const removeSelecionada = createAction(REMOVE_SELECIONADA, payload => payload);
const zerarSelecionado = createAction(ZERAR_SELECIONADO);

export const tarefaActions = {
    filtrarTarefa,
    resultadoFiltrarTarefa,
    zerarfiltroTarefa,
    adicionaSelecionado,
    removeSelecionada,
    zerarSelecionado
};

// INITIAL STATE
const initialState = {
    sugeridas: [],
    selecionados: []
};

// REDUCERS
const reducer = handleActions({
    [ZERAR_FILTRO_TAREFA]: state => ({ ...state, sugeridas: [] }),
    [RESULTADO_FILTRAR_TAREFA]: (state, action) => ({ ...state, sugeridas: action.payload }),
    [ADICIONAR_SELECIONADO]: (state, action) => ({
        ...state,
        selecionados: {
            ...state.selecionados,
            [action.payload.cdTipoTarefa]: {
                ...action.payload
            }
        }
    }),
    [REMOVE_SELECIONADA]: (state, action) => {
        const selecionados = Object.assign({}, state.selecionados);
        delete selecionados[action.payload.cdTipoTarefa];
        return { ...state, selecionados }
    },
    [ZERAR_SELECIONADO]: state => ({
        ...state,
        selecionados: {}
    })
}, initialState);

export default reducer;

// SELECTORS
const getTarefasSugeridas = state => _.values(state.tarefa.sugeridas.tipos || []);
const getTarefasSelecionadas = state => _.values(state.tarefa.selecionados || [])

export const tarefaSelectors = {
    getTarefasSugeridas,
    getTarefasSelecionadas
};