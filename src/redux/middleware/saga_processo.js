import _ from 'lodash';
import { call, put, throttle } from "redux-saga/effects";
import processoService from "../../commons/services/processo";
import { processoActions, processoTypes } from "../modules/processo";
import { flow } from "../modules/flow";

export default function* configuracoesSaga() {
  yield throttle(750, processoTypes.FILTRAR_PROCESSOS, filtrarProcessos);
}

function* filtrarProcessos(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      if (_.size(action.payload.data) < 2) {
        return;
      }
      const processos = yield call(processoService.filtrarProcessos, action.payload.data);
      yield put(processoActions.resultadoFiltrarProcessos(processos));
    }
  });
}