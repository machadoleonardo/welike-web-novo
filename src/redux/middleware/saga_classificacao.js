import _ from 'lodash';
import { delay } from 'redux-saga';
import { call, put, takeLatest } from "redux-saga/effects";
import classificacaoService from "../../commons/services/classificacao";
import { classificacaoActions, classificacaoTypes } from "../modules/classificacao";
import { flow } from "../modules/flow";

export default function* configuracoesSaga() {
  yield takeLatest(classificacaoTypes.FILTRAR_CLASSIFICACAO, filtrarClassificacoes);
}

function* filtrarClassificacoes(action) {
  const data = action.payload.data;
  const type = `${action.type}/${action.payload.id}`;

  yield* flow({
    type,

    fnTry: function* () {
      if (_.size(data) < 2) return;
      yield delay(750);
      const classificacao = yield call(classificacaoService.filtrarClassificacao, data);
      yield put(classificacaoActions.resultadoFiltrarClassificacao(classificacao));
    }
  });
}