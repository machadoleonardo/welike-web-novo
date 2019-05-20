import _ from 'lodash';
import { createAction, handleActions } from 'redux-actions';

// ACTION TYPES
const CREATE_ALERT = `${process.env.PUBLIC_URL}/ALERT_MESSAGE/CREATE_ALERT`;
const DISMISS_ALERT = `${process.env.PUBLIC_URL}/ALERT_MESSAGE/DISMISS_ALERT`;

export const alertMessageTypes = {
  CREATE_ALERT,
  DISMISS_ALERT,
};

// ACTIONS
const createAlert = createAction(CREATE_ALERT);
const dismissAlert = createAction(DISMISS_ALERT);

export const alertMessageActions = {
  createAlert,
  dismissAlert,
};

// INITIAL STATE
const initialState = {
};

// REDUCERS
const reducer = handleActions({
  [CREATE_ALERT]: (state, action) => {
    if(!state.alertMessages){
      state.alertMessages = [];
    }
    
    state.alertMessages.push({
      id: state.alertMessages.length + 1,
      ...action.payload
    })

    return { ...state };
  },
  [DISMISS_ALERT]: (state, action) => {
    let newState = _.cloneDeep(state);
    const id = action.payload;

    _.remove(newState.alertMessages, (alertMessage)=>  alertMessage.id === id );
    return newState;
  },
}, initialState);

export default reducer;

// SELECTORS
const getNextAlertSuccess = (state) => {
  if (state.alertMessage.alertMessages === undefined) {
    // nenhum alert criado ainda...
    return undefined;
  }
  if (_.isEmpty(state.alertMessage.alertMessages)) {
    return {};
  }
  return state.alertMessage.alertMessages[0];
};

const getAlerts = (state) => state.alertMessage;

export const alertMessageSelectors = {
  getNextAlertSuccess,
  getAlerts
};