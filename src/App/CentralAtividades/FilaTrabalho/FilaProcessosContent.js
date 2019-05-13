import _ from "lodash";
import React, { PureComponent } from "react";
import {
  filaActions,
  filaSelectors,
  filaTypes
} from "../../../redux/modules/fila";
import {
  filtroActions,
  filtroSelectors,
  filtroTypes,
} from "../../../redux/modules/filtros";
import ProcessoTarefas from "../ProcessoTarefa/ProcessoTarefas";
import ProcessoTarefasLoading from "../ProcessoTarefa/ProcessoTarefasLoading";
import Status500 from "../../../commons/containers/Status500";
import { compose } from "redux";
import { withRouter } from "react-router";
import {
  actions as flowActions,
  selectors as flowSelectors
} from "../../../redux/modules/flow";
import connect from "react-redux/es/connect/connect";
import { FormattedMessage, injectIntl } from "react-intl";
import BemVindoFilaTrabalho from "./componentes-estaticos/BemVindoFilaTrabalho";
import FilaProcessosEmptyMeus from "./componentes-estaticos/FilaProcessosEmptyMeus";
import FilaProcessosEmptyOutros from "./componentes-estaticos/FilaProcessosEmptyOutros";
import FilaProcessosFiltrosEmpty from "./componentes-estaticos/FilaProcessosFiltrosEmpty";
import { getItem } from "../../../commons/helpers/storage-helper";
import qs from "qs";
import AlertError from "../../../commons/components/AlertError";
import { ROUTES } from "../../../commons/routes/routes";
import { getTipo } from "../../../commons/helpers/route-helper";
import { filterIsNotEmpty } from "../../../commons/helpers/filtro-helper";
import FilaHeadline from "./FilaHeadline";
import Container from "../../../commons/components/Container";
import { classificacaoActions } from "../../../redux/modules/classificacao";
import { interessadoActions } from "../../../redux/modules/interessado";
import { tarefaActions } from "../../../redux/modules/tarefa";
import { IconLoading } from "../../../commons/components/Icon";
import Paragraph from "../../../commons/components/Paragraph";

const CODIGO_USUARIO = "cdUsuarioFila";
const LOCAL_STORAGE_PRIMEIRO_ACESSO =
  "br.com.softplan.ungp.cpa.frontend.primeiro-acesso";

class FilaProcessosContent extends PureComponent {
  componentDidMount() {
    this.setInitialState(this.tipoLocation());
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true);
    this.props.reset(filaTypes.CARREGAR);
  }

  componentDidUpdate(prevProps) {
    const isFiltroAtivo = this.props.filtroAtivo !== prevProps.filtroAtivo;
    const isFiltroSucesso = this.props.filtroSucesso !== prevProps.filtroSucesso;
    const isFiltroSucessoOrdernar = this.props.filtroSucessoOrdenar !== prevProps.filtroSucessoOrdenar;

    if (isFiltroAtivo || isFiltroSucesso || isFiltroSucessoOrdernar) {
      this.setState({ pagina: 1 });
    }

    if (prevProps.loading && !this.props.loading) {
      this.setState({ scrolling: false });
    }

    const current = `${prevProps.location.pathname}`;
    const next = `${this.props.location.pathname}`;

    if (current === next && this.props.done !== prevProps.done && prevProps.filtroPreserve) {
      this.props.desativaFiltroPreserve();
    }

    if (!_.isUndefined(this.state.tipo) && current === next) return;

    // refazer a consulta quando a url alterar (meus/outros)
    this.setInitialState(this.tipoLocation());
  }

  handleScroll = event => {
    const { scrolling } = this.state;
    const { isPossuiMaisItens, loading } = this.props;

    if (scrolling || loading || !isPossuiMaisItens) {
      return;
    }

    // último card visível
    const elUltimoCard = document.querySelector(
      ".sds-fila__list > .sds-processo-card:last-child"
    );
    const offsetUltimoCard = elUltimoCard.offsetTop + elUltimoCard.clientHeight;

    // posição do scroll
    const { target } = event;
    const pageOffset = target.clientHeight + target.scrollTop;

    // quanto antes do final irá carregar
    var offsetAntes = 180;

    if (pageOffset <= offsetUltimoCard - offsetAntes) {
      return;
    }

    this.setState(
      prevState => ({
        pagina: prevState.pagina + 1,
        scrolling: true
      }),
      this.consultarProcessos
    );
  };

  setInitialState = tipo => {
    const { setaTipo, location, filtroPreserve } = this.props;

    setaTipo(getTipo(location.pathname, ROUTES));

    if (!filtroPreserve) {
      this.resetaFiltros();
    }

    this.setState({
      tipo: tipo,
      pagina: 1,
      quantidadePorPagina: 10,
      scrolling: false
    }, this.recarregarProcessos);

  };

  isPrimeiroAcesso = () => {
    const primeiroAcesso = getItem(LOCAL_STORAGE_PRIMEIRO_ACESSO);
    return _.isNull(primeiroAcesso);
  };

  tipoLocation = () => getTipo(this.props.location.pathname, ROUTES);

  limparFiltro = () => {
    this.props.limparFiltro();
  };

  resetaFiltros = () => {
    const {
      resetarPalavraChave,
      resetarFiltroAvancado,
      resetarClassificao,
      resetarTarefa,
      resetarInteressados,
      desativarFiltro
    } = this.props;

    resetarPalavraChave();
    resetarFiltroAvancado();
    resetarClassificao();
    resetarTarefa();
    resetarInteressados();
    desativarFiltro();
  };

  consultarProcessos = () => {
    if (this.isPrimeiroAcesso()) return;

    const { pagina, quantidadePorPagina, tipo } = this.state;
    const { filtroAtivo, camposSimples, camposAvancado, carregar, location } = this.props;

    const params = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });

    const usuario = params[CODIGO_USUARIO];

    let campos = {
      tipo,
      pagina,
      quantidadePorPagina,
      usuario,
      ...camposSimples
    };

    if (filtroAtivo && filterIsNotEmpty(camposAvancado)) {
      campos = {
        ...campos,
        ...camposAvancado
      };

      const natureza = camposAvancado.natureza.map(item => item.split('_'));
      campos.natureza = _.flattenDeep(natureza);
    }

    carregar(campos);
  };

  recarregarProcessos = () => {
    if (this.isPrimeiroAcesso()) return;

    const { pagina, quantidadePorPagina, tipo } = this.state;
    const { camposSimples, location, recarregar } = this.props;

    const params = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });

    const usuario = params[CODIGO_USUARIO];

    recarregar({
      tipo,
      pagina,
      quantidadePorPagina,
      usuario,
      ...camposSimples
    });
  };

  renderHeadline = () => {
    const { filtroAtivo, processos, sucesso } = this.props;

    const propsAtualizarProcesso = {
      title: "FILTROS.HEADLINE.TITULO.MOSTRANDO_PROCESSO_DISPONIVEL",
      labelAcao: "FILTRO.HEADLINE.LABEL_ICON.ATUALIZAR_PROCESSOS",
      icone: "refresh",
      onClick: this.recarregarProcessos
    }

    const propsResultados = {
      title: "FILTROS.HEADLINE.TITULO.RESULTADOS_ENCONTRADOS",
      labelAcao: "FILTRO.BUTTON.LIMPAR_FILTRO.TEXT",
      icone: "close",
      onClick: this.limparFiltro
    }

    if (this.isPrimeiroAcesso() || sucesso && _.isEmpty(processos)) {
      return null
    }

    if (!filtroAtivo) {
      return <FilaHeadline {...propsAtualizarProcesso} />
    }

    if (filtroAtivo && !_.isEmpty(this.props.processos)) {
      return <FilaHeadline {...propsResultados} />
    }
  };

  renderProcessos = () => {
    const { history, filtroAtivo, sucesso, processos, location, done, loading, ativaFiltroPreserve } = this.props;
    const isScrolling = this.state && this.state.scrolling;
    const tipo = this.tipoLocation();

    if (this.isPrimeiroAcesso()) {
      return <BemVindoFilaTrabalho acao={this.recarregarProcessos} />;
    }

    if (!isScrolling && (!done || loading)) {
      return (
        <div id="fila_list" className="sds-fila__list">
          <ProcessoTarefasLoading />
          <ProcessoTarefasLoading />
          <ProcessoTarefasLoading />
          <ProcessoTarefasLoading />
          <ProcessoTarefasLoading />
        </div>
      );
    }

    if (sucesso && _.isEmpty(processos)) {
      if (filtroAtivo) {
        return <FilaProcessosFiltrosEmpty ativaFiltroPreserve={ativaFiltroPreserve} tipo={tipo} history={history} limparFiltro={this.limparFiltro} />;
      }

      if (tipo === "MEUS") {
        return <FilaProcessosEmptyMeus history={history} />;
      }

      return <FilaProcessosEmptyOutros />;
    }

    if (isScrolling || sucesso) {
      return (
        <div id="fila_list" className="sds-fila__list">
          {_.chain(processos)
            .map((processo, key) => {
              return (
                <ProcessoTarefas
                  key={key}
                  processo={processo}
                  tipo={tipo}
                  location={location.pathname}
                  recarregarProcessos={this.recarregarProcessos}
                />
              );
            })
            .value()}
        </div>
      );
    }

    return <Status500 />;
  };

  render() {
    const { errorPageMessage } = this.props;

    return (
      <Container classModifiers="sds-margin-top-lg">
        {errorPageMessage != null && <AlertError message={errorPageMessage["message"] || errorPageMessage} />}
        {this.renderHeadline()}
        {this.renderProcessos()}

        {this.state &&
          this.state.scrolling && (
            <div className="sds-load__content sds-margin-vertical">
              <IconLoading width="3rem" height="3rem" />
              <Paragraph ><FormattedMessage id="LABELS.CARREGANDO_MAIS_PROCESSOS" /></Paragraph>
            </div>
          )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: flowSelectors.isLoadingByType(state, filaTypes.CARREGAR),
  sucesso: flowSelectors.isSuccessByType(state, filaTypes.CARREGAR),
  erro: flowSelectors.getErrorByType(state, filaTypes.CARREGAR),
  done: flowSelectors.isDoneByType(state, filaTypes.CARREGAR),
  processos: filaSelectors.getProcessos(state),
  isPossuiMaisItens: filaSelectors.isPossuiMaisItens(state),
  ativo: filaSelectors.getProcessoAtivo(state),
  expadido: filaSelectors.isViewProcessoExpadido(state),
  errorPageMessage: flowSelectors.getErrorByType(state,
    filaTypes.CARREGAR,
    filaTypes.ATUALIZAR_PROCESSO,
    filaTypes.ATUALIZAR_STORE
  ),
  filtroAtivo: filtroSelectors.getFiltroAtivo(state),
  filtroSucesso: flowSelectors.isSuccessByType(state, filtroTypes.ADD_CAMPOS_AVANCADOS),
  filtroSucessoOrdenar: flowSelectors.isSuccessByType(state, filtroTypes.ORDENAR),
  filtroPreserve: filtroSelectors.getPreserveFiltro(state),
  camposSimples: filtroSelectors.getCamposSimples(state),
  camposAvancado: filtroSelectors.getCamposAvancado(state)
});

const mapDispatchToProps = {
  carregar: filaActions.carregar,
  recarregar: filaActions.recarregar,
  toogleAtivo: filaActions.toogleAtivo,
  setaTipo: filtroActions.tipo,
  limparFiltro: filtroActions.limparFiltro,
  resetarPalavraChave: filtroActions.resetPalavraChave,
  resetarFiltroAvancado: filtroActions.resetCamposAvancado,
  resetarClassificao: classificacaoActions.zerarSelecionado,
  resetarTarefa: tarefaActions.zerarSelecionado,
  resetarInteressados: interessadoActions.zerarSelecionado,
  desativarFiltro: filtroActions.desativaFiltro,
  ativaFiltroPreserve: filtroActions.ativaPreserveFiltro,
  desativaFiltroPreserve: filtroActions.desativaPreserveFiltro,
  reset: flowActions.reset
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl,
  withRouter
)(FilaProcessosContent);
