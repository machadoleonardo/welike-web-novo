import React, { Fragment, PureComponent } from "react";
import { compose } from "redux";
import { FormattedMessage, injectIntl } from "react-intl";
import classnames from "classnames";
import { isNull } from "util";
import { usuarioSelectors } from "../../../redux/modules/usuario";
import { connect } from "react-redux";
import { alertMessageActions } from "../../../redux/modules/alert-message";
import { filaActions, filaTypes, filaSelectors } from "../../../redux/modules/fila";
import { selectors as flowSelectors } from "../../../redux/modules/flow";
import { modalMessageActions } from "../../../redux/modules/modal-message";

import { ROUTES } from '../../../commons/routes/routes';
import { getTipo } from "../../../commons/helpers/route-helper";

import ButtonDesatribuir from "../../../commons/components/ButtonDesatribuir";
import ButtonAtribuir from "../../../commons/components/ButtonAtribuir";
import Modal from "../../../commons/components/Modal";

import IframeCriarNovaTarefa from "./IframeCriarNovaTarefa";
import TarefaErrorTooltip from "./TarefaErrorTooltip";
import { msg } from "../../../commons/i18n/intl";

const MENSAGENS_TAREFA = {
  atribuida: msg("FILA_PROCESSOS_TAREFAS.TAREFA_ATRIBUIDA_COM_SUCESSO"),
  desatribuida: msg("FILA_PROCESSOS_TAREFAS.TAREFA_DESATRIBUIDA_COM_SUCESSO"),
  error: msg("FILA_PROCESSOS_TAREFAS.ERROR_ATRIBUIR_DESATRIBUIR"),
  warning: msg("FILA_PROCESSOS_TAREFAS.NAO_POSSIVEL_DESATRIBUIR_TAREFA_USUARIO_NAO_ESTA_ATRIBUIDO_A_ELA"),
}

class Tarefa extends PureComponent {

  state = {
    openModal: false,
    heigthIframeInterno: 0
  };

  componentDidUpdate(prevProps) {
    const { isTarefaJaAtribuidaAoutroUsuario } = this.props;

    if (isTarefaJaAtribuidaAoutroUsuario) {
      this.createModal();
    }

    this.notifiqueStatusAtribuicao(prevProps, this.props);
  }

  toggleNotificacaoAtribuirDesatribuir = (props) => {
    const { createAlert, isTarefaAtribuida, } = props;

    if (isTarefaAtribuida) {
      return createAlert({ message: MENSAGENS_TAREFA.atribuida })
    }

    if (!isTarefaAtribuida) {
      createAlert({ message: MENSAGENS_TAREFA.desatribuida })
    }
  }

  aconteceuErroAtribuirDesatribuir = (prevProps, props) => {
    const isAtribuicaoComErroAtual = props.tarefa.atribuicao.isErrorAtribuirDesatribuir;

    if (isAtribuicaoComErroAtual) {
      return true;
    }
    return false;
  }

  notifiqueStatusAtribuicao = (prevProps, props) => {
    const { createAlert } = this.props;

    if (this.aconteceuErroAtribuirDesatribuir(prevProps, props)) {
      createAlert({ message: MENSAGENS_TAREFA.warning, type: "ERROR" })
      return;
    }

    if (this.statusAtribuicaoTarefaMudou(prevProps, props)) {
      this.toggleNotificacaoAtribuirDesatribuir(props);
    }
  }

  statusAtribuicaoTarefaMudou = (prevProps, props) => {
    //Necessário, pois no filtro, as tarefas vem dinamicamente e evito de comparar tarefas diferentes
    if (prevProps.tarefa.codigo !== props.tarefa.codigo) {
      return false;
    }
    const statusAtribuicaoAnterior = prevProps.tarefa.atribuicao.isTarefaAtribuida;
    const statusAtribuicaoAtual = props.tarefa.atribuicao.isTarefaAtribuida;

    if (statusAtribuicaoAnterior !== statusAtribuicaoAtual) {
      return true;
    }
    return false;
  }

  openModal = () => {
    const { ativar, processo } = this.props;
    ativar(processo);
    this.setState({ openModal: true })
  };

  confirmar = () => {
    const { usuario, tarefa, closeModal, atribuirTarefa } = this.props;
    closeModal();
    atribuirTarefa({ usuario, tarefa, acaoConfirmar: true });
  }

  cancelar = () => {
    const { usuario, tarefa, atribuirTarefa } = this.props;
    atribuirTarefa({ usuario, tarefa, acaoCancelar: true });
  }

  createModal = () => {
    this.props.createModal({
      titulo: 'Atribuir tarefa?',
      mensagem: 'Essa tarefa já está atribuida a outro usuário, deseja se atribuir mesmo assim?',
      confirmar: this.confirmar,
      cancelar: this.cancelar
    })
  }

  closeModal = () => {
    const { atualizarProcesso, tipo } = this.props;
    const processo = this.props.processo.codigo;

    atualizarProcesso({ processo, tipo });

    this.setState({
      openModal: false,
    })
  };

  onCreateTarefa = (message) => {
    const { createAlert } = this.props;
    this.closeModal();

    createAlert({
      type: 'SUCCESS',
      message
    });
  };

  getPrazo = (tarefa) => {
    return tarefa.prazo ? tarefa.prazo : <FormattedMessage id="FILA_PROCESSOS_TAREFAS.TAREFAS.PRAZO_INDEFINIDO" />;
  };

  onLoadModal = () => {
    if (this.state.openModal) {
      const iframe = document.getElementById("iframe-consultar-tarefa");

      iframe.addEventListener("load", () => {
        this.setState({
          heigthIframeInterno: iframe.height - 60
        });
      });
    }
  };

  statusAtribuicaoTarefa = () => {
    const { tarefa, usuario } = this.props;
    const codigoUsuarioAtribuidaNaTarefa = tarefa.usuarioAtribuicao.codigo;
    const codigoUsuarioLogado = usuario.codigo;

    if (codigoUsuarioAtribuidaNaTarefa && (codigoUsuarioAtribuidaNaTarefa === codigoUsuarioLogado)) {
      return "atribuidaUsuarioLogado";
    }

    if (codigoUsuarioAtribuidaNaTarefa && (codigoUsuarioAtribuidaNaTarefa !== codigoUsuarioLogado)) {
      return "naoAtribuidaUsuarioLogado";
    }

    if (isNull(codigoUsuarioAtribuidaNaTarefa)) {
      return "naoAtribuidaANenhumUsuario"
    }
  }

  getEspecificButton = () => {
    const { tarefa, usuario } = this.props;

    const propsDefault = {
      tarefa,
      usuario
    }

    return {
      atribuidaUsuarioLogado: <ButtonDesatribuir
        {...propsDefault}
      />,
      naoAtribuidaUsuarioLogado: <ButtonAtribuir
        {...propsDefault}
      />,
      naoAtribuidaANenhumUsuario: <ButtonAtribuir
        {...propsDefault}
      />
    }
  }

  variables = () => {
    const { tarefa, getTextoAtribuicao, location } = this.props;
    const isAtribuido = tarefa.usuarioAtribuicao && Boolean(tarefa.usuarioAtribuicao.codigo);

    return {
      tarefa: tarefa,
      height: this.state.heigthIframeInterno,
      processo: this.props.processo,
      vencida: Boolean(tarefa.vencida),
      textoAtribuicao: getTextoAtribuicao,
      iconeAtribuicao: isAtribuido ? 'timelapse' : 'error_outline',
      corAtribuicao: classnames({ 'sds-color-support': isAtribuido }, { 'sds-color-warning': !isAtribuido }),
      textoData: <Fragment>{tarefa.cadastro} - {this.getPrazo(tarefa)}</Fragment>,
      btnToggle: isAtribuido,
      location: location
    }
  };

  isFilaOutros = () => {
    // compara se o return de getTipo é igual a "OUTROS"
    if (getTipo(this.props.location, ROUTES).localeCompare("OUTROS") === 0) {
      return true;
    }
    return false;
  }

  render() {
    const {
      tarefa,
      vencida,
      textoAtribuicao,
      iconeAtribuicao,
      corAtribuicao,
      textoData,
      processo,
      height
    } = this.variables();
    const titulo = `${processo.numero} - ${tarefa.nome}`;
    const url = `/cpa-core-frontend/#/tarefa-visualizar?idTarefa=${tarefa.codigo}&cdProcesso=${tarefa.processo}&aba=aba_dados_finalizacao&idObjRetorno=frameTarefas&multiselection=false&height=${height}`;

    return (
      <Fragment>
        {this.state.openModal &&
          <Modal
            onLoadComponent={this.onLoadModal}
            title={titulo}
            onClose={this.closeModal}
            openModal={this.state.openModal}
            type={"fullscreen"}>
            <IframeCriarNovaTarefa
              id={"iframe-consultar-tarefa"}
              url={url}
              title={titulo}
              onReloadPageAndShowMessageSucess={this.onCreateTarefa} />
          </Modal>
        }
        <li className="sds-processo-card__tarefas-item">
          <a className="sds-processo-card__overflow-text">
            <div className="sds-subtitle-small" onClick={this.openModal}>{tarefa.nome}</div>
            <div className="sds-tarefa-data">
              <div className="sds-tarefa-status">
                <i className={`material-icons ${vencida ? 'sds-color-error' : corAtribuicao}`}>{iconeAtribuicao}</i>
                <p className={classnames('sds-p-small', { 'sds-color-error': vencida })}>{textoAtribuicao}</p>
              </div>

              <div className="sds-tarefa-date sds-processo-card__overflow-text">
                <i className={classnames('material-icons', { 'sds-color-error': vencida })}>date_range</i>
                <p className={classnames('sds-p-small', { 'sds-color-error': vencida })}>{textoData}</p>
              </div>
              {
                tarefa.atribuicao.isErrorAtribuirDesatribuir &&
                <TarefaErrorTooltip
                  label="Erro ao desatribuir a tarefa, por favor atualize a fila." />
              }
              {this.getEspecificButton()[this.statusAtribuicaoTarefa()]}
            </div>
          </a>
        </li>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  usuario: usuarioSelectors.getUsuario(state),
  isTarefaAtribuida: filaSelectors.isTarefaAtribuida(state, props.tarefa),
  isTarefaJaAtribuidaAoutroUsuario: filaSelectors.isTarefaJaAtribuidaAoutroUsuario(props.tarefa)(state)
})

const mapDispatchToProps = {
  atualizarProcesso: filaActions.atualizarProcesso,
  ativar: filaActions.ativar,
  createAlert: alertMessageActions.createAlert,
  createModal: modalMessageActions.createModal,
  closeModal: modalMessageActions.closeModal,
  atribuirTarefa: filaActions.atribuirTarefa
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(Tarefa);
