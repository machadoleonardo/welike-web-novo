import React, {Fragment, PureComponent} from "react";
import classnames from 'classnames';
import {FormattedMessage} from "react-intl";
import Modal from "../../../commons/components/Modal";
import {filaActions} from "../../../redux/modules/fila";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {alertMessageActions} from "../../../redux/modules/alert-message";
import IframeCriarNovaTarefa from "./IframeCriarNovaTarefa";

class TarefasEmpty extends PureComponent {

  state = {
    openModal: false,
  };

  openModal = () => {
    this.props.ativar(this.props.processo);
    this.setState({
      openModal: true,
    })
  };

  closeModal = () => {
    const processo = this.props.processo.codigo;
    const tipo = this.props.tipo;
    this.props.atualizarProcesso({ processo, tipo });

    this.setState({
      openModal: false,
    });
  };

  onCreateTarefa = () => {
    this.closeModal();
    this.props.createAlert({
      message: 'Tarefa criada com sucesso', type: 'SUCCESS'
    });
  };

  onClickVerTarefas = () => {
    this.props.toogleAtivo({ processo: this.props.processo, visualizacao: 'TAREFAS' });
  };

  onClickRemover = () => {
    const processo = this.props.processo.codigo;
    this.props.removerProcesso({ processo });
  };

  render() {
    const { processo, toggleTarefa } = this.props;
    const url = `/cpa-core-frontend/#/nova-tarefa/${processo.codigo}`;
    const titulo = `${processo.numero} - Criar Tarefa`;

    return (
      <Fragment>
        {
          this.state.openModal &&
          <Modal
            title={titulo}
            onClose={this.closeModal}
            openModal={this.state.openModal}
            type={"fullscreen"}>
            <IframeCriarNovaTarefa onReloadPageAndShowMessageSucess={this.onCreateTarefa} url={url} title={titulo} />
          </Modal>
        }

        <div id="sdsCardTarefas" className={classnames('sds-processo-card__tarefas sds-processo-card__tarefas--empty', { 'sds-processo-card__tarefas--closed': !toggleTarefa })}>
          <header className="sds-processo-card__header ">
            <a className="sds-processo-card__tarefas-title sds-processo-card__overflow-text">
              <i className="material-icons sds-color-primary">add_circle</i>
              <div className="sds-subtitle-small">
                <FormattedMessage id="FILA_PROCESSOS_TAREFAS.TAREFAS.NENHUMA_TAREFA_ABERTA" />
              </div>
            </a>
            <button className="sds-btn sds-btn--flat sds-btn--secondary" onClick={this.onClickVerTarefas}>
              <i className="material-icons sds-btn__icon sds-btn--right">arrow_forward</i>
              <FormattedMessage id="FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.VER_TAREFAS" />
            </button>
            <button className="sds-btn sds-btn--icon sds-btn--secondary">
              <i className="material-icons">arrow_forward</i>
            </button>
          </header>
          <article className="sds-processo-card__tarefas-list--empty">
            <p className="sds-p">
              {processo.habilitaRemoverDaFila &&
                <FormattedMessage id="FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.NA_FILA_DE_OUTROS" />}
              {!processo.habilitaRemoverDaFila &&
                <FormattedMessage id="FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.PARADO_NA_FILA" />}
            </p>
            <p className="sds-p">
              <b><FormattedMessage id="FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.O_QUE_DESEJA_FAZER" /></b>
            </p>
            <div className="sds-actions-row">
              <button onClick={this.openModal} className="sds-btn sds-btn--raised sds-waves-effect">
                <FormattedMessage id="FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.CRIAR_TAREFA" />
              </button>
              {processo.habilitaRemoverDaFila &&
                <button className="sds-btn sds-btn--outlined sds-btn--primary sds-waves-effect" onClick={this.onClickRemover}>
                  <FormattedMessage id="FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.REMOVER_FILA" />
                </button>
              }
            </div>
          </article>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  ativar: filaActions.ativar,
  atualizarProcesso: filaActions.atualizarProcesso,
  removerProcesso: filaActions.removerProcesso,
  toogleAtivo: filaActions.toogleAtivo,
  createAlert: alertMessageActions.createAlert,
};

export default compose(connect(null, mapDispatchToProps))(TarefasEmpty);

