import {createAction, handleActions} from 'redux-actions';
import _ from "lodash";

// ACTION TYPES
const ATUALIZAR_DASHBOARD = `${process.env.PUBLIC_URL}/DASHBOARD/ATUALIZAR_DASHBOARD`;
const BUSCAR_DASHBOARD = `${process.env.PUBLIC_URL}/DASHBOARD/ATUALIZAR_DASHBOARD`;

export const dashboardTypes = {
  ATUALIZAR_DASHBOARD,
  BUSCAR_DASHBOARD,
};

// ACTIONS
const atualizarDashboard = createAction(ATUALIZAR_DASHBOARD);
const buscarDashboard = createAction(BUSCAR_DASHBOARD);

export const dashboardActions = {
  atualizarDashboard,
  buscarDashboard,
};

// INITIAL STATE
const initialState = {};

// REDUCERS
const reducer = handleActions({
  [ATUALIZAR_DASHBOARD]: (state, action) => {
    const dashboard = action.payload;
    return {...state, dashboard};
  },
}, initialState);

export default reducer;

// SELECTORS
const getDashboard = (state) => {
    return state.dashboard.dashboard;
};

export const dashboardSelectors = {
    getDashboard,
};