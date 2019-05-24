import {combineReducers} from 'redux';
import FlowReducer from './modules/flow';
import UsuarioReducer from './modules/usuario';
import AlertMessageReducer from './modules/alert-message';
import ModalMessageReducer from './modules/modal-message'

const rootReducer = combineReducers({
  flow: FlowReducer,
  usuario: UsuarioReducer,
  alertMessage: AlertMessageReducer,
  modalMessage: ModalMessageReducer
});

export default rootReducer;
