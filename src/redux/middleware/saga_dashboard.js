import {call, put, takeEvery} from 'redux-saga/effects';

import {flow} from '../modules/flow';
import {dashboardTypes, dashboardActions} from '../modules/dashboard';
import service from '../../commons/services/dashboard';

export default function* dashboardSaga() {
  yield takeEvery(dashboardTypes.ATUALIZAR_DASHBOARD, buscarDashboard);
}

function* buscarDashboard(action) {
  yield* flow({
    type: action.type,

    fnTry: function* () {
      const dashboard = yield call(service.getDashboard);
      yield put(dashboardActions.atualizarDashboard(dashboard));
    },
  });
}