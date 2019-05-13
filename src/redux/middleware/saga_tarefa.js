import _ from 'lodash';
import { delay } from 'redux-saga';
import { call, put, takeLatest } from "redux-saga/effects";
import tarefaService from "../../commons/services/tarefa";
import { tarefaActions, tarefaTypes } from "../modules/tarefa";
import { flow } from "../modules/flow";

export default function* configuracoesSaga() {
  yield takeLatest(tarefaTypes.FILTRAR_TAREFA, filtrarTarefas);
}

function* filtrarTarefas(action) {
  const data = action.payload.data;
  const type = `${action.type}/${action.payload.id}`;

  yield* flow({
    type,

    fnTry: function* () {
      if (_.size(data) < 2) return;
      yield delay(750);
      const tarefa = yield call(tarefaService.filtrarTarefas, data);
      yield put(tarefaActions.resultadoFiltrarTarefa(tarefa));
    }
  });
}