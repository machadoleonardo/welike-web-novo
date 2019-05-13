import { IntlProvider } from 'react-intl';

const messages = {
  'PASTA.LIBERAR_ACESSO_EXTERNO': 'Liberar Acesso Externo',
  'PASTA.LABELS.LIBERAR_ACESSO_EXTERNO_DOCUMENTOS': 'Liberar acesso devido a um pedido de vistas:',
  'PASTA.LABELS.LIBERAR_ACESSO_EXTERNO_DOCUMENTOS_PARA': 'Liberar acesso externo para:',
  'PASTA.LABELS.LIBERAR_ACESSO_EXTERNO_DOCUMENTOS_ATE': 'Acesso permitido até:',
  'PASTA.ERRO.LIBERAR_ACESSO_EXTERNO_DATA': 'Data inválida, acesso permitido precisa ter data maior que o dia atual.',
  'PASTA.ERRO.LIBERAR_ACESSO_EXTERNO_INTERESSADO': 'Para liberar acesso externo é necessário informar pelo menos um interessado ou endereço de e-mail.',
  'PASTA.ERRO.LIBERAR_ACESSO_EXTERNO_PROCESSO_PEDIDO': 'Informe o processo do pedido de vistas',
  'PASTA.ERRO.GESTAO_ACESSO_DATA_TERMINO_INVALIDA': 'A data inserida deve ser maior que a data atual.',
  'PASTA.ALERT.LIBERAR_ACESSO_EXTERNO_CONFIRMAR_SIGILO': 'Prezado(a), este processo/documento possui regras de controle de acesso, deseja liberar acesso externo mesmo assim?',
  'PASTA.ALERT.ACESSO_EXTERNO_LIBERADO_SUCESSO': 'Liberação de acesso externo realizada com sucesso.',
  'PASTA.LABELS.LIBERAR_ACESSO_EXTERNO_CONFIRMAR': 'Liberar',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_TITULO_SEM_ACESSO': 'O processo/documento ainda não possui acessos liberados.',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SUBTITULO': 'Acessos liberados',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_DATA_LIBERACAO': 'Data Liberação',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_PEDIDO_VISTAS': 'Pedido de vistas',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_USUARIO_LIBERACAO': 'Usuário de liberação',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO': 'Situação',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO_EXPIRADO': 'Acesso expirado',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO_ATIVO': 'Acesso ativo',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO_CANCELADO': 'Acesso cancelado',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_LINK_ENVIADO': 'Link de acesso enviado para:',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_ANEXO_LIBERADO': 'Anexos liberados:',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_LABEL_CANCELAR': 'Cancelar o acesso',
  'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_LABEL_CANCELANDO': 'Cancelando acesso...',
  'PASTA.LABELS.SITUACAO_NAO_SUPORTADA': 'Não suportado...',
  'PASTA.LABELS.SEM_VALIDADE': 'Sem validade',
  'PASTA.LABELS.ACESSO_TERMINA': 'Acesso termina em',
  'FILA_PROCESSOS_TAREFAS.MEUS': 'Meus processos e tarefas',
  'FILA_PROCESSOS_TAREFAS.OUTROS': 'Outros processos e tarefas',
  'LABELS.MESSAGES.COMMONS.STATUS_404': 'Ops, não encontramos a página que você estava procurando.',
  'LABELS.MESSAGES.COMMONS.STATUS_500': 'Ocorreu um erro enquanto a página estava sendo carregada. Você pode recarregar a página ou tentar novamente mais tarde.',
  'LABELS.LOADING': 'Carregando...',
  'LABELS.CARREGANDO_MAIS_PROCESSOS': 'Carregando mais processos',
  'COMPONENTE_INTERESSADO.PLACEHOLDER': 'Digite o nome ou e-mail',
  'COMPONENTE_PROCESSO.PLACEHOLDER': 'Pesquisar número do processo',
  'FILA_PROCESSOS_TAREFAS.BOTAO_VAMOS_LA': 'Vamos lá!',
  'FILA_PROCESSOS_TAREFAS.BOTAO_APLICAR_FILTRO': 'Aplicar filtros',
  'FILA_PROCESSOS_TAREFAS.BEM_VINDO.TEXTO_APRESENTACAO': 'Aqui você encontra todos os processos e tarefas de sua responsabilidade. Pronto para começar?',
  'FILA_PROCESSOS_TAREFAS.BEM_VINDO.TITULO': 'Bem vindo a sua fila de trabalho',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_PROCESSOS.TEXTO': 'Atualmente não existem processos disponíveis para o seu setor.',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.TITULO': 'Você não possui tarefas abertas.',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.TEXTO_APRESENTACAO': 'Gostaria de verificar se há outras tarefas disponíveis no seu setor para iniciar?',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.CRIAR_TAREFA': 'Criar nova tarefa',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.REMOVER_FILA': 'Remover da fila',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.O_QUE_DESEJA_FAZER': 'O que você deseja fazer?',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.VER_TAREFAS': 'Ver tarefas do processo',
  'FILA_PROCESSOS_TAREFAS.NAO_ENCONTROU_RESULTADO': 'Gostaria de verificar se o(s) processo(s) filtrado(s) está(ao) disponíveis no seu setor?',
  'FILA_PROCESSOS_TAREFAS.TAREFAS.FAZENDO': 'Fazendo',
  'FILA_PROCESSOS_TAREFAS.TAREFAS.ATRIBUIDA': 'Atribuida a',
  'FILA_PROCESSOS_TAREFAS.TAREFAS.A_FAZER': 'A fazer',
  'FILA_PROCESSOS_TAREFAS.TAREFAS.ATRIBUIR': 'Atribuir',
  'FILA_PROCESSOS_TAREFAS.TAREFAS.DESATRIBUIR': 'Desatribuir',
  'FILA_PROCESSOS_TAREFAS.TAREFAS.PRAZO_INDEFINIDO': 'prazo indefinido',
  'FILA_PROCESSOS_TAREFAS.TAREFAS.NENHUMA_TAREFA_ABERTA': 'Nenhuma tarefa aberta',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.PARADO_NA_FILA': 'Esse processo não possui tarefas abertas e está parado na sua fila!',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.NA_FILA_DE_OUTROS': 'Esse processo não possui tarefas abertas nessa fila.',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_RESULTADOS.NA_FILA_MEUS': 'Aplicar o mesmo filtro de busca na fila outros ou limpar os filtros para uma nova busca.',
  'FILA_PROCESSOS_TAREFAS.NAO_POSSUI_RESULTADOS.NA_FILA_DE_OUTROS': 'Aplicar o mesmo filtro de busca na fila meus ou limpar os filtros para uma nova busca.',
  'FILA_PROCESSO_TAREFAS.IMAGE.SEM_RESULTADO.ALT': 'Ilustração mostrando a fila de trabalho vazia',
  'FILA_PROCESSOS_TAREFAS.LOADING.TITULO': 'Processo de autorização para supressão de vegetação',
  'FILA_PROCESSOS_TAREFAS.LOADING.DATA': '12/02/2018',
  'FILA_PROCESSOS_TAREFAS.CONFIRMAR': 'Confirmar',
  'FILA_PROCESSOS_TAREFAS.CANCELAR': 'Cancelar',
  'FILA_PROCESSOS_TAREFAS.TAREFA_ATRIBUIDA_COM_SUCESSO': 'Tarefa atribuida com sucesso.',
  'FILA_PROCESSOS_TAREFAS.TAREFA_DESATRIBUIDA_COM_SUCESSO': 'Tarefa desatribuida com sucesso.',
  'FILA_PROCESSOS_TAREFAS.ERROR_ATRIBUIR_DESATRIBUIR': "Erro ao desatribuir tarefa, por favor atualize a fila.",
  'FILA_PROCESSOS_TAREFAS.NAO_POSSIVEL_DESATRIBUIR_TAREFA_USUARIO_NAO_ESTA_ATRIBUIDO_A_ELA': 'Não é possível desatribuir a tarefa, pois o usuário não está atribuído a ela.',  
  'FILTROS.NAO_POSSUI_PROCESSOS.TEXTO': ' A partir dos seus critérios de busca não localizamos processos ou tarefas',
  'FILTROS_SIMPLES.LABEL.ORDERNAR_POR': 'Ordenar por',
  'FILTROS_AVANCADO.LABEL.CLASSIFICACAO': 'Classificação',
  'FILTROS_AVANCADO.LABEL.TIPO_DE_TAREFA': 'Tipo de tarefa',
  'FILTROS_AVANCADO.LABEL.INTERESSADO': 'Interessado',
  'FILTROS.LOADING.LABEL.ORDERNAR_PROCESSO': 'Ordernando processos',
  'FILTROS.LOADING.LABEL.APLICANDO_FILTRO': 'Aplicando filtros',
  'FILTROS.LOADING.LABEL.LIMPAR_FILTRO': 'Limpando filtros',
  'FILTROS.INPUT.PALAVRA_CHAVE.PLACEHOLDER': 'Filtrar por palavra-chave',
  'FILTROS.INPUT.FILTRAR_CLASSIFICACAO.PLACEHOLDER': 'Filtrar por classificação',
  'FILTROS.INPUT.FILTRAR_TAREFA.PLACEHOLDER': 'Filtrar por tarefa',
  'FILTROS.INPUT.FILTRAR_USUARIO.PLACEHOLDER': 'Filtrar por usuário atribuído',
  'FILTROS.INPUT.ATRIBUICAO.LABEL': 'Atribuição',
  'FILTROS.SELECT_ORDERNAR_POR.PROCESSO_DT_ENTRADA_ASC': 'Processos mais antigos',
  'FILTROS.SELECT_ORDERNAR_POR.PROCESSO_DT_ENTRADA_DESC': 'Processos mais recentes',
  'FILTROS.SELECT_ORDERNAR_POR.TAREFA_CADASTRO_ASC': 'Tarefas mais antigas',
  'FILTROS.SELECT_ORDERNAR_POR.TAREFA_CADASTRO_DESC': 'Tarefas mais recentes',
  'FILTROS.SELECT_ORDERNAR_POR.TAREFA_VENCIMENTO_DESC': 'Maior prazo de tarefa',
  'FILTROS.SELECT_ORDERNAR_POR.TAREFA_VENCIMENTO_ASC': 'Menor prazo de tarefa',
  'FILTROS.CHECKBOX.FILTRAR_USUARIO.NATUREZA_DO_PROCESSO': 'Natureza do processo/documento',
  'FILTROS.BUTTONS.APLICAR_FILTRO': 'Aplicar filtros',
  'FILTROS.BUTTONS.ATUALIZAR_FILTRO': 'Atualizar filtros',
  'FILTROS.CHECKBOX_PROCESSO.PROCESSOS': 'Processos',
  'FILTROS.CHECKBOX_PROCESSO.DOCUMENTOS': 'Documentos',
  'FILTROS.CHECKBOX_ATRIBUICAO.TODOS': 'Todas',
  'FILTROS.CHECKBOX_ATRIBUICAO.SEM_ATRIBUICAO': 'Sem atribuição',
  'FILTROS.CHECKBOX_ATRIBUICAO.ATRIBUIDADAS': 'Atribuídas',
  'FILTROS.HEADLINE.TITULO.MOSTRANDO_PROCESSO_DISPONIVEL': 'Mostrando os processos disponíveis',
  'FILTROS.HEADLINE.TITULO.RESULTADOS_ENCONTRADOS': 'Resultados Encontrados',
  'FILTRO.HEADLINE.LABEL_ICON.ATUALIZAR_PROCESSOS': 'Atualizar processos',
  'FILTRO.BUTTON.LIMPAR_FILTRO.TEXT': 'Limpar filtros'
};

export function getIntlProviderConfig() {
  return { locale: 'en', messages };
}

const I18N =
  new IntlProvider(getIntlProviderConfig(), {})
    .getChildContext()
    .intl;

export function msg(id) {
  return I18N.formatMessage({ id });
}