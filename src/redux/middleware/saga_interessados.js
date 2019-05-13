import _ from 'lodash';
import { delay } from 'redux-saga';
import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import interessadosService from "../../commons/services/interessado";
import { flow } from "../modules/flow";
import { removeEqualsByKey } from "../../commons/helpers/array-helper";
import { interessadoActions, interessadoTypes } from "../modules/interessado";

export default function* configuracoesSaga() {
  yield takeLatest(interessadoTypes.FILTRAR_INTERESSADOS, filtrarInteressados);
  yield takeEvery(interessadoTypes.CARREGAR_INTERESSADOS, carregarInteressados);
  yield takeEvery(interessadoTypes.ZERAR_FILTRO_INTERESSADOS, zerarFiltroInteressados);
  yield takeEvery(interessadoTypes.ADICIONAR_INTERESSADOS_SELECIONADOS, adicionarInteressadosSelecionados);
  yield takeEvery(interessadoTypes.REMOVER_INTERESSADOS_SELECIONADOS, removerInteressadosSelecionados);
}

function* carregarInteressados(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      const interessados = yield call(interessadosService.carregarInteressados, action.payload.data);
      yield put(interessadoActions.resultadoCarregarInteressados(interessados));
    }
  });
}

function* filtrarInteressados(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      if (_.size(action.payload.data) < 2) {
        return;
      }

      yield delay(750);
      const interessados = yield call(interessadosService.filtrarInteressados, action.payload.data);
      const cleanedData = removeEqualsByKey('cdInteressado', interessados, action.payload.selecionados);
      yield put(interessadoActions.resultadoFiltrarInteressados(cleanedData));
    }
  });
}

function* zerarFiltroInteressados(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      yield put(interessadoActions.resultadoFiltrarInteressados([]));
    }
  });
}

function* adicionarInteressadosSelecionados(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      // busca primeiro no servidor
      const interessados = yield call(interessadosService.filtrarInteressados, action.payload.data);
      // inicia objeto interessado com propriedades principais com email digitado, p/ caso não ache no servidor utilizar
      let interessadoValido = { 'nomeInteressado': '', 'email': action.payload.data };
      if (!_.isEmpty(interessados)) { // se encontrar no servidor filtra retorno pelo email
        interessadoValido = yield _.chain(interessados)
          .filter(x => {
            return x["email"].toLowerCase() === action.payload.data.toLowerCase();
          }).first().value();
      }
      yield put(interessadoActions.resultadoCarregarInteressados([interessadoValido]));
    }
  });
}

function* removerInteressadosSelecionados(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      yield put(interessadoActions.resultadoRemoverInteressados(action.payload));
      if (action.payload.callback) {
        action.payload.callback();
      }
    }
  });
}