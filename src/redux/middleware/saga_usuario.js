import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

import {flow} from '../modules/flow';
import {usuarioActions, usuarioTypes} from '../modules/usuario';
import usuarioService from '../../commons/services/usuario';

export default function* loginSaga() {
  yield takeEvery(usuarioTypes.LOGIN, login);
}

function* login(action) {
  yield* flow({
    type: action.type,

    fnTry: function* () {
      const token = yield call(usuarioService.login(action.user, action.password));
      yield put(usuarioActions.login(token));
    },
  });
}