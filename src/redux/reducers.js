import { combineReducers } from 'redux';
import FlowReducer from './modules/flow';
import FilaReducer from './modules/fila';
import PastaReducer from './modules/acesso-externo';
import ProcessoReducer from './modules/processo';
import InteressadoReducer from './modules/interessado';
import ClassificaoReducer from './modules/classificacao';
import TarefaReducer from './modules/tarefa';
import UsuarioReducer from './modules/usuario';
import AlertMessageReducer from './modules/alert-message';
import FilterReducer from './modules/filtros'; 
import ModalMessageReducer from './modules/modal-message'

const rootReducer = combineReducers({
  flow: FlowReducer,
  fila: FilaReducer,
  filtros: FilterReducer,
  pasta: PastaReducer,
  processo: ProcessoReducer,
  interessado: InteressadoReducer,
  classificacao: ClassificaoReducer,
  tarefa: TarefaReducer,
  usuario: UsuarioReducer,
  alertMessage: AlertMessageReducer,
  modalMessage: ModalMessageReducer
});

export default rootReducer;
