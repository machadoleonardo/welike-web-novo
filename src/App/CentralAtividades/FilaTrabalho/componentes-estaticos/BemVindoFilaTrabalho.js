import React, { PureComponent } from "react";
import { FormattedMessage } from "react-intl";
import { setItem } from "../../../../commons/helpers/storage-helper";

const LOCAL_STORAGE_PRIMEIRO_ACESSO = "br.com.softplan.ungp.cpa.frontend.primeiro-acesso";

class BemVindoFilaTrabalho extends PureComponent {

  redirectToFila = () => {
    setItem(LOCAL_STORAGE_PRIMEIRO_ACESSO, false);
    this.props.acao();
  };

  render() {
    return (
      <div className="sds-fila__empty-state">
        <img src={`${process.env.PUBLIC_URL}/assets/imgs/filaTrabalho/first-access-fila.svg`}
          alt="Primeiro acesso à fila de trabalho" />
        <h6>
          <FormattedMessage id="FILA_PROCESSOS_TAREFAS.BEM_VINDO.TITULO" />
        </h6>
        <p className="sds-p">
          <FormattedMessage id="FILA_PROCESSOS_TAREFAS.BEM_VINDO.TEXTO_APRESENTACAO" />
        </p>
        <button onClick={this.redirectToFila} className="sds-btn sds-btn--raised">
          <FormattedMessage id="FILA_PROCESSOS_TAREFAS.BOTAO_VAMOS_LA" />
        </button>
      </div>
    );
  }
}

export default BemVindoFilaTrabalho;