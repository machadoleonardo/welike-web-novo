export const ordenar = [
    { value: 'PROCESSO_DT_ENTRADA_ASC', name: 'FILTROS.SELECT_ORDERNAR_POR.PROCESSO_DT_ENTRADA_ASC' },
    { value: 'PROCESSO_DT_ENTRADA_DESC', name: 'FILTROS.SELECT_ORDERNAR_POR.PROCESSO_DT_ENTRADA_DESC' },
    { value: 'TAREFA_CADASTRO_ASC', name: 'FILTROS.SELECT_ORDERNAR_POR.TAREFA_CADASTRO_ASC' },
    { value: 'TAREFA_CADASTRO_DESC', name: 'FILTROS.SELECT_ORDERNAR_POR.TAREFA_CADASTRO_DESC' },
    { value: 'TAREFA_VENCIMENTO_ASC', name: 'FILTROS.SELECT_ORDERNAR_POR.TAREFA_VENCIMENTO_ASC' },
    { value: 'TAREFA_VENCIMENTO_DESC', name: 'FILTROS.SELECT_ORDERNAR_POR.TAREFA_VENCIMENTO_DESC' },
];

export const checkboxProcesso = {
    name: 'natureza',
    items: [
        { id: "D_F", label: 'FILTROS.CHECKBOX_PROCESSO.PROCESSOS' },
        { id: "G_L", label: 'FILTROS.CHECKBOX_PROCESSO.DOCUMENTOS' },
    ]
};

export const checkboxAtribuicao = {
    name: 'atribuido',
    items: [
        { id: "TODOS", label: 'FILTROS.CHECKBOX_ATRIBUICAO.TODOS' },
        { id: "NAO_ATRIBUIDO", label: 'FILTROS.CHECKBOX_ATRIBUICAO.SEM_ATRIBUICAO' },
        { id: "ATRIBUIDO", label: 'FILTROS.CHECKBOX_ATRIBUICAO.ATRIBUIDADAS' }
    ]
};