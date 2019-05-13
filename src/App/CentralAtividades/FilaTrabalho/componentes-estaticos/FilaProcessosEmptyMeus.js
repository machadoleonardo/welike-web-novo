import React from "react";
import { FormattedMessage } from "react-intl";
import { ROUTES } from "../../../../commons/routes/routes";

const FilaProcessosEmptyOutros = ({ history }) => {
  return (
    <div className="sds-fila__empty-state">
      <img src={`${process.env.PUBLIC_URL}/assets/imgs/filaTrabalho/fila-empty.svg`} alt="Ilustração mostrando a fila de trabalho vazia" />
      <h6>
        <FormattedMessage id="FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.TITULO" />
      </h6>
      <p className="sds-p">
        <FormattedMessage id="FILA_PROCESSOS_TAREFAS.NAO_POSSUI_TAREFAS.TEXTO_APRESENTACAO" />
      </p>
      <button onClick={() => history.push(ROUTES.FILA_OUTROS.path)} className="sds-btn sds-btn--raised">
        <FormattedMessage id="FILA_PROCESSOS_TAREFAS.BOTAO_VAMOS_LA" />
      </button>
    </div>
  );
};

export default FilaProcessosEmptyOutros;