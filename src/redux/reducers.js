import {combineReducers} from 'redux';
import FlowReducer from './modules/flow';
import UsuarioReducer from './modules/usuario';
import NotificationReducer from './modules/notification';
import AlertMessageReducer from './modules/alert-message';
import ModalMessageReducer from './modules/modal-message'
import InfluencerReducer from './modules/influencer'

const rootReducer = combineReducers({
  flow: FlowReducer,
  usuario: UsuarioReducer,
  notification: NotificationReducer,
  alertMessage: AlertMessageReducer,
  modalMessage: ModalMessageReducer,
  influencer: InfluencerReducer,
});

export default rootReducer;
