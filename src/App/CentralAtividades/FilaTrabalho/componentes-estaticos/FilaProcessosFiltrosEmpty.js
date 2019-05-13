import React, { PureComponent } from 'react';
import { FormattedMessage } from "react-intl";
import { ROUTES } from '../../../../commons/routes/routes';
import { msg } from '../../../../commons/i18n/intl';
import Paragraph from '../../../../commons/components/Paragraph';
import Row from '../../../../commons/components/Row';
import RaisedButton from '../../../../commons/components/RaisedButton';
import Button from '../../../../commons/components/Button';

class FilaProcessosFiltrosEmpty extends PureComponent {

  handleClick = () => {
    const { tipo, ativaFiltroPreserve, history } = this.props;
    const routeLink = (tipo === 'MEUS') ? ROUTES.FILA_OUTROS.path : ROUTES.FILA_MEUS.path;

    ativaFiltroPreserve();
    history.push(routeLink);
  }

  render() {
    const { limparFiltro, tipo } = this.props;

    return (
      <div className="sds-fila__empty-state">
        <img
          src={`${process.env.PUBLIC_URL}/assets/imgs/filaTrabalho/fila-not-result.svg`}
          alt={msg('FILA_PROCESSO_TAREFAS.IMAGE.SEM_RESULTADO.ALT')}
          width="200"
          height="200"
        />
        <h6><FormattedMessage id="FILTROS.NAO_POSSUI_PROCESSOS.TEXTO" /></h6>

        <Paragraph>
          {
            tipo === 'MEUS' ?
              msg('FILA_PROCESSOS_TAREFAS.NAO_POSSUI_RESULTADOS.NA_FILA_MEUS') :
              msg('FILA_PROCESSOS_TAREFAS.NAO_POSSUI_RESULTADOS.NA_FILA_DE_OUTROS')
          }
        </Paragraph>

        <Row classModifiers="sds-fila__empty-state-btns">
          <RaisedButton onClick={this.handleClick} label="FILA_PROCESSOS_TAREFAS.BOTAO_APLICAR_FILTRO" />
          <Button secondary onClick={limparFiltro} label="FILTRO.BUTTON.LIMPAR_FILTRO.TEXT" />
        </Row>
      </div>
    );
  }
}

export default FilaProcessosFiltrosEmpty;