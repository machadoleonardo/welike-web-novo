import {createAction, handleActions} from 'redux-actions';

// ACTION TYPES
const CREATE_MODAL = `${process.env.PUBLIC_URL}/ALERT_MESSAGE/CREATE_MODAL`;
const CLOSE_MODAL = `${process.env.PUBLIC_URL}/ALERT_MESSAGE/CLOSE_MODAL`;

export const modalMessageTypes = {
  CREATE_MODAL,
  CLOSE_MODAL,
};

// ACTIONS
const createModal = createAction(CREATE_MODAL);
const closeModal = createAction(CLOSE_MODAL);

export const modalMessageActions = {
  createModal,
  closeModal,
};

const initialState = {
};

// REDUCERS
const reducer = handleActions({
  [CREATE_MODAL]: (state, action) => {
    return {...state, ...action.payload, isOpen:true };
  
  },
  [CLOSE_MODAL]: (state, action) => {
    return {...state, isOpen: false}
  },
}, initialState);

export default reducer;

// SELECTORS
const getOptionsModal = (state) => state.modalMessage;

const isOpenModalMessage = (state) => {
  return state.modalMessage.isOpen;
};

export const modalMessageSelectors  = {
  getOptionsModal,
  isOpenModalMessage,
};