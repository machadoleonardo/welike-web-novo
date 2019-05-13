import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import classnames from "classnames";
import { filaActions, filaSelectors, filaTypes } from "../../../redux/modules/fila";
import { injectIntl } from "react-intl";
import { selectors as flowSelectors } from "../../../redux/modules/flow";

class Processo extends PureComponent {
  state = {
    aberto: false,
    expandido: false,
    height: null,
    myRef: React.createRef()
  };

  componentDidMount() {
    this.setState({
      height: this.state.myRef.current.offsetHeight
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    await this.timeout(160);
    if (this.state.myRef.current && this.state.myRef.current.offsetHeight !== prevState.height) {
      this.setState({
        height: this.state.myRef.current.offsetHeight
      });
    }
  }

  toggleCardFooter = () => {
    this.setState({ expandido: !this.state.expandido });
  };

  selecionar = () => {
    this.props.toogleAtivo({ processo: this.props.processo, visualizacao: 'DADOS_BASICOS' });
  };

  timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  render() {
    const { processo } = this.props;

    return (
      <div id="sdsCardProcesso" className={classnames('sds-processo-card__processo', { 'sds-processo-card__processo--small': this.props.processo.toggleTarefa })}>
        <header className="sds-processo-card__header">
          <i className="material-icons">desktop_windows</i>
          <div className="sds-processo-card__overflow-text sds-mobile-hidden">
            <span className="sds-overline" title={processo.classificacao}>{processo.classificacao}</span>
          </div>
          <div className="sds-overline">{processo.entrada}</div>
        </header>
        <div className="sds-overline sds-desktop-hidden" title={processo.classificacao}>{processo.classificacao}</div>
        <article className="sds-processo-card__title" onClick={this.selecionar}>
          <div className="sds-processo-card__overflow-text">
            <h6 title={processo.interessado}>{processo.interessado}</h6>
          </div>
          <p className="sds-p-small">{processo.numero}</p>
        </article>
        <footer id="sdsCardFooter" className={classnames('sds-processo-card__footer', { 'sds-processo-card__footer--expanded': this.state.expandido })}>
          <div className="sds-data">
            <p
              ref={this.state.myRef}
              className="sds-p"
              style={{ whiteSpace: 'pre-line' }}>
              {processo.detalhamento}
            </p>
          </div>
          {this.state.height >= 49 &&
            <div className={classnames('sds-link',
              { 'sds-processo-card__close-text': this.state.expandido },
              { 'sds-processo-card__expand-text': !this.state.expandido }
            )}
              onClick={this.toggleCardFooter}>
              ...{this.state.expandido ? 'esconder' : 'ver mais'}
            </div>
          }
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ativo: filaSelectors.getProcessoAtivo(state),
    done: flowSelectors.isDoneByType(state, filaTypes.CARREGAR),
  };
}

const mapDispatchToProps = {
  toogleAtivo: filaActions.toogleAtivo,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(Processo);

