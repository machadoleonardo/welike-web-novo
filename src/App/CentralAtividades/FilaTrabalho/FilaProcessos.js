import React, { PureComponent } from "react";
import classnames from "classnames";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ROUTES } from "../../../commons/routes/routes";
import { selectors as flowSelectors } from "../../../redux/modules/flow";
import { filaActions, filaSelectors } from "../../../redux/modules/fila";
import { filtroTypes, filtroSelectors } from "../../../redux/modules/filtros";
import FilaProcessosHeader from "./FilaProcessosHeader";
import ProcessoSelecionado from "../Processo/ProcessoSelecionado";
import Fila from "./componentes-estaticos/Fila";
import FilaProcessosContent from "./FilaProcessosContent";
import FilaFormSidebar from "./FilaFormSidebar";
import FilaWrapper from "./componentes-estaticos/FilaWrapper";
import FilaContent from "./componentes-estaticos/FilaContent";
import FilaLoadingWrapper from "./componentes-estaticos/FilaLoadingWrapper";
import FilaExpand from "./componentes-estaticos/FIlaExpandNav";
import { getTipo } from "../../../commons/helpers/route-helper";

class FilaProcessos extends PureComponent {
  expandFila = () => {
    this.props.toogleAtivo({});
  };

  render() {
    const {
      expadido,
      ativo,
      location,
      loadingFiltros,
      loadingAplicar,
      loadingLimparFiltro,
      loadingOrdenar
    } = this.props;
    const tipo = getTipo(location.pathname, ROUTES);
    const title = `FILA_PROCESSOS_TAREFAS.${tipo}`;
    const loading = loadingFiltros || loadingAplicar;
    const classes = classnames("sds-app", { "sds-app--process-active": expadido });

    return (
      <section
        className={classes}
      >
        {/* Fila */}
        <Fila ativo={ativo}>
          <FilaWrapper>
            <FilaFormSidebar location={location.pathname} />

            <FilaContent>
              <FilaProcessosHeader location={location.pathname} title={title} />

              <FilaLoadingWrapper
                loadingOrdenar={loadingOrdenar}
                loadingFiltros={loading}
                loadingLimparFiltro={loadingLimparFiltro}
              >
                <FilaProcessosContent />
              </FilaLoadingWrapper>

            </FilaContent>
          </FilaWrapper>

          {/* Setas */}
          <FilaExpand ativo={ativo} handleClick={this.expandFila} />
        </Fila>

        {/* Processos */}
        <ProcessoSelecionado tipo={tipo} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  ativo: filaSelectors.getProcessoAtivo(state),
  expadido: filaSelectors.isViewProcessoExpadido(state),
  filtroAtivo: filtroSelectors.getFiltroAtivo(state),
  loadingOrdenar: flowSelectors.isLoadingByType(state, filtroTypes.ORDENAR),
  loadingLimparFiltro: flowSelectors.isLoadingByType(
    state,
    filtroTypes.LIMPAR_FILTRO
  ),
  loadingFiltros: flowSelectors.isLoadingByType(
    state,
    filtroTypes.BUSCAR_PALAVRA
  ),
  loadingAplicar: flowSelectors.isLoadingByType(
    state,
    filtroTypes.ADD_CAMPOS_AVANCADOS
  ),
  recarregar: filaActions.recarregar
});

const mapDispatchToProps = {
  toogleAtivo: filaActions.toogleAtivo
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(FilaProcessos);
