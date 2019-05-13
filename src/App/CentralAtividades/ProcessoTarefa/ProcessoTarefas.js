import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import classnames from 'classnames';
import { filaTypes, filaSelectors } from '../../../redux/modules/fila';
import { injectIntl } from 'react-intl';
import { selectors as flowSelectors } from "../../../redux/modules/flow";
import Processo from "../Processo/Processo";
import Tarefas from "../Tarefas/Tarefas";
import ProcessoTarefasLoading from './ProcessoTarefasLoading';

class ProcessoTarefas extends PureComponent {

  render() {
    const { processo, ativo, loading, tipo, location } = this.props;
    const isAtivo = ativo && ativo.codigo === processo.codigo;

    if (loading) {
      return <ProcessoTarefasLoading />;
    }

    return (
      <div className={classnames("sds-card sds-processo-card", { "sds-card--active": isAtivo })}>
        <Processo processo={processo} tipo={tipo} />
        <Tarefas
          processo={processo}
          tipo={tipo}
          location={location}
          recarregarProcessos={this.props.recarregarProcessos}
        />
      </div >
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ativo: filaSelectors.getProcessoAtivo(state),
    loading: flowSelectors.isLoadingByType(state, `${filaTypes.ATUALIZAR_PROCESSO}_${props.processo.codigo}`),
  };
}

export default compose(connect(mapStateToProps), injectIntl)(ProcessoTarefas);