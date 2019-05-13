import React, { PureComponent } from "react";
import { connect} from 'react-redux';
import { compose } from 'redux';
import { filaActions, filaTypes } from "../../../redux/modules/fila";
import { selectors as flowSelectors, actions as flowActions } from "../../../redux/modules/flow";
import OutlinedButton from '../OutlinedButton/index';

class ButtonDesatribuir extends PureComponent {

  handleDesatribuir =(e) => {
    const { usuario, tarefa, desatribuirTarefa } = this.props;
    desatribuirTarefa({ usuario, tarefa });
    e.stopPropagation();
  }

  render() {
    return (
    <OutlinedButton
      waves={"sds-waves-effect"}
      primary
      loading={this.props.loading}      
      label="FILA_PROCESSOS_TAREFAS.TAREFAS.DESATRIBUIR"
      onClick={this.handleDesatribuir}
    />
      )
  }
}

function mapStateToProps(state, props){
  return {
    loading:  flowSelectors.isLoadingByType(state, `${filaTypes.DESATRIBUIR_TAREFA}_${props.tarefa.codigo}`),
  }
} 

const mapDispatchToProps = {
  desatribuirTarefa: filaActions.desatribuirTarefa,
  reset: flowActions.resetByType,
};

export default  compose(connect(mapStateToProps, mapDispatchToProps))(ButtonDesatribuir);
