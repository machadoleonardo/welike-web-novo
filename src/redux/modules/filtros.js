import { createAction, handleActions } from 'redux-actions';

const RESET_PALAVRA_CHAVE = `${process.env.PUBLIC_URL}/FILTRO/RESET_PALAVRA_CHAVE`;
const RESET_CAMPOS_AVANCADO = `${process.env.PUBLIC_URL}/FILTRO/RESET_CAMPOS_AVANCADO`;
const ADD_CAMPOS_AVANCADOS = `${process.env.PUBLIC_URL}/FILTRO/ADD_CAMPOS_AVANCADOS`;
const TIPO = `${process.env.PUBLIC_URL}/FILTRO/TIPO`;
const ORDENAR = `${process.env.PUBLIC_URL}/FILTRO/ORDENAR`;
const BUSCAR_PALAVRA = `${process.env.PUBLIC_URL}/FILTRO/BUSCAR_PALAVRA`;
const FILTRO_SIMPLES = `${process.env.PUBLIC_URL}/FITRO/SIMPLES`;
const FILTRO_AVANCADO = `${process.env.PUBLIC_URL}/FITRO/AVANCADO`;
const TOGGLE_FILTRO = `${process.env.PUBLIC_URL}/FITRO/TOGGLE_FILTRO`;
const LIMPAR_FILTRO = `${process.env.PUBLIC_URL}/FITRO/LIMPAR_FILTRO`;
const ATIVA_FILTRO = `${process.env.PUBLIC_URL}/FILTRO/ATIVA_FILTRO`;
const DESATIVA_FILTRO = `${process.env.PUBLIC_URL}/FILTRO/DESATIVA_FILTRO`;
const ATIVA_PRESERVE_FILTRO = `${process.env.PUBLIC_URL}/FILTRO/ATIVA_PRESERVE_FILTRO`;
const DESATIVA_PRESERVE_FILTRO = `${process.env.PUBLIC_URL}/FILTRO/DESATIVA_PRESERVE_FILTRO`;

export const filtroTypes = {
    RESET_PALAVRA_CHAVE,
    RESET_CAMPOS_AVANCADO,
    ADD_CAMPOS_AVANCADOS,
    TIPO,
    ORDENAR,
    BUSCAR_PALAVRA,
    FILTRO_SIMPLES,
    FILTRO_AVANCADO,
    TOGGLE_FILTRO,
    LIMPAR_FILTRO,
    ATIVA_FILTRO,
    DESATIVA_FILTRO,
    ATIVA_PRESERVE_FILTRO,
    DESATIVA_PRESERVE_FILTRO
}

// ACTIONS
const resetPalavraChave = createAction(RESET_PALAVRA_CHAVE);
const resetCamposAvancado = createAction(RESET_CAMPOS_AVANCADO);
const addCamposAvancados = createAction(ADD_CAMPOS_AVANCADOS, payload => payload);
const tipo = createAction(TIPO, payload => payload);
const ordenar = createAction(ORDENAR);
const buscarPorPalavra = createAction(BUSCAR_PALAVRA, payload => payload);
const filtroSimples = createAction(FILTRO_SIMPLES, payload => payload);
const filtroAvancado = createAction(FILTRO_AVANCADO, payload => payload);
const limparFiltro = createAction(LIMPAR_FILTRO, payload => payload);
const toggleFiltro = createAction(TOGGLE_FILTRO);
const ativaFiltro = createAction(ATIVA_FILTRO);
const desativaFiltro = createAction(DESATIVA_FILTRO);
const ativaPreserveFiltro = createAction(ATIVA_PRESERVE_FILTRO);
const desativaPreserveFiltro = createAction(DESATIVA_PRESERVE_FILTRO);

export const filtroActions = {
    resetPalavraChave,
    resetCamposAvancado,
    addCamposAvancados,
    tipo,
    ordenar,
    buscarPorPalavra,
    filtroSimples,
    filtroAvancado,
    toggleFiltro,
    limparFiltro,
    ativaFiltro,
    desativaFiltro,
    ativaPreserveFiltro,
    desativaPreserveFiltro
}

// INICIAL STATE
const camposAvancado = {
    classificacao: [],
    tipoTarefa: [],
    interessado: [],
    natureza: [],
    atribuido: 'TODOS',
    usuarioAtribuicao: []
}

const initialState = {
    tipo: null,
    aberto: false,
    ativo: false,
    preserve: false,
    palavraChave: '',
    ordenacao: 'PROCESSO_DT_ENTRADA_ASC',
    camposAvancado
}

// REDUCERS
const reducer = handleActions({
    [RESET_PALAVRA_CHAVE]: state => ({
        ...state,
        palavraChave: '',
    }),

    [RESET_CAMPOS_AVANCADO]: state => ({
        ...state,
        camposAvancado,
    }),

    [ADD_CAMPOS_AVANCADOS]: (state, action) => ({
        ...state,
        camposAvancado: action.payload
    }),

    [TIPO]: (state, { payload }) => ({
        ...state,
        tipo: payload
    }),

    [ORDENAR]: (state, action) => ({
        ...state,
        ordenacao: action.payload
    }),

    [BUSCAR_PALAVRA]: (state, action) => ({
        ...state,
        palavraChave: action.payload
    }),

    [TOGGLE_FILTRO]: state => ({
        ...state,
        aberto: !state.aberto
    }),

    [ATIVA_FILTRO]: state => ({
        ...state,
        ativo: true
    }),

    [DESATIVA_FILTRO]: state => ({
        ...state,
        ativo: false
    }),

    [ATIVA_PRESERVE_FILTRO]: state => ({
        ...state,
        preserve: true
    }),

    [DESATIVA_PRESERVE_FILTRO]: state => ({
        ...state,
        preserve: false
    }),
}, initialState);

export default reducer;

// SELECTORS
const getTipoFiltro = state => state.filtros.tipo
const getOrdenarPor = state => state.filtros.ordenacao
const getPalavraChave = state => state.filtros.palavraChave
const getCamposSimples = state => {
    const { ordenacao, palavraChave } = state.filtros;
    return { ordenacao, palavraChave }
}
const getCamposAvancado = state => state.filtros.camposAvancado
const getFiltroAberto = state => state.filtros.aberto
const getFiltroAtivo = state => state.filtros.ativo
const getPreserveFiltro = state => state.filtros.preserve

export const filtroSelectors = {
    getTipoFiltro,
    getOrdenarPor,
    getPalavraChave,
    getFiltroAberto,
    getCamposSimples,
    getCamposAvancado,
    getFiltroAtivo,
    getPreserveFiltro
}