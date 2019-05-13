import { all } from 'redux-saga/effects';

import filaSaga from './saga_fila';
import pastaSaga from './saga_acesso_externo';
import processoSaga from './saga_processo';
import interessadoSaga from './saga_interessados';
import classificacaoSaga from './saga_classificacao';
import tarefaSaga from './saga_tarefa';
import usuarioSaga from './saga_usuario';
import filtroSaga from './saga_filtros';

export default function* watchMany() {
  yield all([
    filaSaga(),
    pastaSaga(),
    processoSaga(),
    interessadoSaga(),
    classificacaoSaga(),
    tarefaSaga(),
    usuarioSaga(),
    filtroSaga(),
  ]);
};