import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { filaActions, filaTypes } from "../../../redux/modules/fila";
import { selectors as flowSelectors, actions as flowActions } from "../../../redux/modules/flow";
import OutlinedButton from '../OutlinedButton/index';

class ButtonAtribuir extends PureComponent {
  
  handleAtribuir = (e) => {
    const { usuario, tarefa, atribuirTarefa } = this.props; 
      atribuirTarefa({ usuario, tarefa });
      e.stopPropagation();
  }
  
  render(){
    return (
     <OutlinedButton
      waves={"sds-waves-effect"}
      primary
      loading={this.props.loading}
      label="FILA_PROCESSOS_TAREFAS.TAREFAS.ATRIBUIR"
      onClick={this.handleAtribuir}
      teste= {this.props.testes}
     />
    )
  }
}

function mapStateToProps(state, props){
  return {
    loading:  flowSelectors.isLoadingByType(state, `${filaTypes.ATRIBUIR_TAREFA}_${props.tarefa.codigo}`),
  }
}

const mapDispatchToProps = {
  atribuirTarefa: filaActions.atribuirTarefa,
  reset: flowActions.resetByType,
  invertByType: flowActions.invertByType
};

export default  compose(connect(mapStateToProps, mapDispatchToProps))(ButtonAtribuir);
