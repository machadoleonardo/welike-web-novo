import React, { PureComponent, Fragment } from 'react';
import classnames from 'classnames';
import _ from "lodash";
import Tarefa from "./Tarefa";
import { FormattedMessage } from "react-intl";
import { usuarioSelectors } from "../../../redux/modules/usuario";
import { filaActions, filaSelectors } from "../../../redux/modules/fila";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";
import TarefasEmpty from "./TarefasEmpty";

class Tarefas extends PureComponent {

  toggleTarefas = () => {
    this.props.executeToogleTarefa(this.props.processo.codigo);
  };

  buttonToggle = () => {
    return <div className="sds-processo-card__expand-btn" onClick={this.toggleTarefas}>
      <button className="sds-btn sds-btn--icon sds-btn--rounded sds-btn--secondary">
        <i className="material-icons">chevron_left</i>
      </button>
    </div>
  };

  onClickVerTarefas = () => {
    this.props.toogleAtivo({ processo: this.props.processo, visualizacao: 'TAREFAS' });
  }

  getTextoAtribuicao = (tarefa) => {
    if (String(this.props.usuario.codigo) === String(tarefa.usuarioAtribuicao.codigo)) {
      return <FormattedMessage id="FILA_PROCESSOS_TAREFAS.TAREFAS.FAZENDO" />;
    }
    if (tarefa.usuarioAtribuicao.nome) {
      return <Fragment><FormattedMessage id="FILA_PROCESSOS_TAREFAS.TAREFAS.ATRIBUIDA" /> {tarefa.usuarioAtribuicao.nome}</Fragment>
    }
    return <FormattedMessage id="FILA_PROCESSOS_TAREFAS.TAREFAS.A_FAZER" />;
  }

  render() {
    const { location } = this.props;
    const tarefas = this.props.processo.tarefas || [];

    return (
      <Fragment>
        {this.buttonToggle()}
        {this.props.qtTarefasAberta > 0 &&
          <div id="sdsCardTarefas" className={classnames('sds-processo-card__tarefas', { 'sds-processo-card__tarefas--closed': !this.props.processo.toggleTarefa })}>
            <header className="sds-processo-card__header">
              <div className="sds-processo-card__tarefas-title sds-processo-card__overflow-text">
                <i className={classnames('material-icons', { 'sds-color-error': this.props.flVencida })}>{this.props.flVencida ? 'assignment_late' : 'assignment'}</i>
                <span className="sds-subtitle-small">{this.props.qtTarefasAberta}</span>
                <div className="sds-subtitle-small">{`Tarefas em aberto: ${this.props.qtTarefasAberta}`}</div>
              </div>

              <button className="sds-btn sds-btn--flat sds-btn--secondary" onClick={this.onClickVerTarefas}>
                <i className="material-icons sds-btn__icon sds-btn--right">arrow_forward</i>
                Ver tarefas do processo
              </button>

              <button className="sds-btn sds-btn--icon sds-btn--secondary">
                <i className="material-icons">arrow_forward</i>
              </button>
            </header>

            <article className="sds-processo-card__tarefas-list-wrapper">
              <ul className="sds-processo-card__tarefas-list">
                {
                  tarefas.map((tarefa, i) =>
                    <Tarefa
                      key={i}
                      tarefa={tarefa}
                      usuario={this.props.usuario}
                      processo={this.props.processo}
                      atribuirTarefa={this.props.atribuirTarefa}
                      desatribuirTarefa={this.props.desatribuirTarefa}
                      getTextoAtribuicao={this.getTextoAtribuicao(tarefa)}
                      location={location}
                      tipo={this.props.tipo}
                      recarregarProcessos={this.props.recarregarProcessos}
                    />
                  )
                }
              </ul>
              <ul className="sds-processo-card__tarefas-status-list">
                <li>
                  <i className="material-icons sds-color-warning">error_outline</i>
                  <span className="sds-subtitle-small">{this.props.qtTarefasFazer}</span>
                </li>
                <li>
                  <i className="material-icons sds-color-support">timelapse</i>
                  <span className="sds-subtitle-small">{this.props.qtTarefasFazendo}</span>
                </li>
              </ul>
            </article>
          </div>
        }
        {this.props.qtTarefasAberta <= 0 &&
          <TarefasEmpty
            processo={this.props.processo}
            tipo={this.props.tipo}
            toggleTarefa={this.props.processo.toggleTarefa}
          />}
      </Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    usuario: usuarioSelectors.getUsuario(state),
    qtTarefasAberta: filaSelectors.getQtTarefasAberta(state, props.processo.codigo),
    qtTarefasFazendo: filaSelectors.getQtTarefasFazendo(state, props.processo.codigo),
    qtTarefasFazer: filaSelectors.getQtTarefasFazer(state, props.processo.codigo),
    flVencida: filaSelectors.getFlVencida(state, props.processo.codigo),
  };
}

const mapDispatchToProps = {
  executeToogleTarefa: filaActions.toogleTarefa,
  toogleAtivo: filaActions.toogleAtivo,
  atribuirTarefa: filaActions.atribuirTarefa,
  desatribuirTarefa: filaActions.desatribuirTarefa
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Tarefas);

