import { call, put, takeEvery } from "redux-saga/effects";
import acessoExternoService from "../../commons/services/acesso-externo";
import { flow } from "../modules/flow";
import { acessoExternoActions, acessoExternoTypes } from "../modules/acesso-externo";

export default function* configuracoesSaga() {
  yield takeEvery(acessoExternoTypes.LIBERAR_ACESSO_EXTERNO, liberarAcessoExterno);
  yield takeEvery(acessoExternoTypes.CARREGAR_ACESSO_LIBERADOS, carregarAcessoExterno);
  yield takeEvery(acessoExternoTypes.CANCELAR_ACESSO_LIBERADOS, cancelarAcessoExterno);
  yield takeEvery(acessoExternoTypes.EDITAR_ACESSO_LIBERADOS, editarAcessoExterno);
}

function* liberarAcessoExterno(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      yield call(acessoExternoService.liberarAcessoExterno, action.payload.data);
      if (action.payload.callback) {
        action.payload.callback();
      }
    }
  });
}

function* carregarAcessoExterno(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      const accessos = yield call(acessoExternoService.carregarAcessoExterno, action.payload.data);
      yield put(acessoExternoActions.resultadoCarregarAcessoExterno(accessos));
    }
  });
}

function* cancelarAcessoExterno(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      yield call(acessoExternoService.cancelarAcessoExterno, action.payload.data);
      const accessos = yield call(acessoExternoService.carregarAcessoExterno, action.payload.data["cdProcesso"]);
      yield put(acessoExternoActions.resultadoCarregarAcessoExterno(accessos));
      if (action.payload.callback) {
        action.payload.callback();
      }
    }
  });
}


function* editarAcessoExterno(action) {
  yield* flow({
    type: action.type,
    fnTry: function* () {
      yield call(acessoExternoService.editarAcessoExterno, action.payload.data);
      const accessos = yield call(acessoExternoService.carregarAcessoExterno, action.payload.data["cdProcesso"]);
      yield put(acessoExternoActions.resultadoCarregarAcessoExterno(accessos));
    }
  });
}