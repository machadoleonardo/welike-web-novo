import _ from 'lodash';
import { delay } from 'redux-saga';
import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';

import { flow } from '../modules/flow';
import { usuarioTypes, usuarioActions } from '../modules/usuario';
import usuarioService from '../../commons/services/usuario';

export default function* loginSaga() {
  yield takeEvery(usuarioTypes.USUARIO_CONSULTAR, consultar);
  yield takeLatest(usuarioTypes.FILTRAR_USUARIO, filtrarUsuarios);
}

function* consultar(action) {
  yield* flow({
    type: action.type,

    fnTry: function* () {
      const usuario = yield call(usuarioService.consultar);
      yield put(usuarioActions.atualizarUsuarioStore(usuario));
    },
  });
}

function* filtrarUsuarios(action) {
  const data = action.payload.data;
  const type = `${action.type}/${action.payload.id}`;

  yield* flow({
    type,

    fnTry: function* () {
      if (_.size(data) < 2) return;

      yield delay(750);
      const usuario = yield call(usuarioService.filtrarUsuario, data);
      yield put(usuarioActions.resultadoFiltrarUsuario(usuario));
    }
  });
}