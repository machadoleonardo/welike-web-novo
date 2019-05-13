import React, { PureComponent } from 'react';
import classnames from 'classnames'

import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from "react-redux";
import { filaActions, filaSelectors } from '../../../redux/modules/fila';
import IconMaterial from '../../../commons/components/IconMaterial';


class ProcessoSelecionado extends PureComponent {

  esconderFila = () => {
    const processo = this.props.ativo.codigo;
    const { tipo } = this.props;

    this.props.atualizarProcesso({
      processo, tipo
    });

    this.props.toogleAtivo({});
  };

  getUrlVisualizacao = (processo, visualizacao) => {
    if (visualizacao === 'TAREFAS') {
      return `/cpav/visualizarTarefasProcesso.do?numeroProcesso=${processo.numero}&itemAba=aba_tarefas&escondeBotaoVoltar=true`;
    }

    return `/cpav/visualizarProcesso.do?numeroProcesso=${processo.numero}&escondeBotaoVoltar=true`;
  };

  render() {
    const { ativo, visualizacao } = this.props;

    return (
      <section id="sdsProcesso" className={ classnames('sds-processo', { 'sds-processo--closed': !ativo }) }>
        <div className="sds-expand-wrapper" onClick={this.esconderFila}>
          <div className="sds-expand__circle sds-bg-primary sds-hide-xs">
            <IconMaterial icon="arrow_backward" />
          </div>
        </div>
        
        <div className="sds-processo__wrapper">
          {ativo &&
            <iframe
              title={`Processo Selecionado: ${ativo.numero}`}
              src={this.getUrlVisualizacao(ativo, visualizacao)}
              height="100%"
              frameBorder="0" />
          }
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    ativo: filaSelectors.getProcessoAtivo(state),
    visualizacao: filaSelectors.getVisualizacaoAtivo(state),
  };
}

const mapDispatchToProps = {
  toogleAtivo: filaActions.toogleAtivo,
  atualizarProcesso: filaActions.atualizarProcesso,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(ProcessoSelecionado);
