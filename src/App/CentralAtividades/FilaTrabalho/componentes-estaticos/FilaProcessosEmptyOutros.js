import React from 'react';
import { FormattedMessage } from "react-intl";

const FilaProcessosEmptyOutros = () => {
  return (
    <div className="sds-fila__empty-state">
      <h6>
        <FormattedMessage id="FILA_PROCESSOS_TAREFAS.NAO_POSSUI_PROCESSOS.TEXTO" />
      </h6>
    </div>
  );
}

export default FilaProcessosEmptyOutros;