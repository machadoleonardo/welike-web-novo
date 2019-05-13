import _ from 'lodash';
import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import filtroService from "../../commons/services/filtros";
import filaService from "../../commons/services/fila";
import {
  filtroActions,
  filtroSelectors,
  filtroTypes
} from "../modules/filtros";
import { filaActions } from "../modules/fila";
import { classificacaoTypes } from "../modules/classificacao";
import { tarefaTypes } from "../modules/tarefa";
import { interessadoTypes } from "../modules/interessado";

import { flow } from "../modules/flow";
import { filterIsNotEmpty } from "../../commons/helpers/filtro-helper";

export default function* configuracoesSaga() {
  yield takeLatest(filtroTypes.ADD_CAMPOS_AVANCADOS, filtro);
  yield takeLatest(filtroTypes.ORDENAR, filtro);
  yield takeLatest(filtroTypes.BUSCAR_PALAVRA, filtro);
  yield takeEvery(filtroActions.limparFiltro, limparFiltros);
}

function* filtro(action) {
  // buscar no servidor
  yield* flow({
    type: action.type,

    fnTry: function* () {
      const tipo = yield select(filtroSelectors.getTipoFiltro);
      const ordenacao = yield select(filtroSelectors.getOrdenarPor);
      const palavraChave = yield select(filtroSelectors.getPalavraChave);
      const camposAvancado = yield select(filtroSelectors.getCamposAvancado);

      let campos = {
        tipo,
        pagina: 1,
        palavraChave,
        ordenacao
      }

      if (filterIsNotEmpty(camposAvancado)) {
        campos = {
          ...campos,
          ...camposAvancado
        }

        const natureza = camposAvancado.natureza.map(item => item.split('_'));
        campos.natureza = _.flattenDeep(natureza);
      }

      yield delay(550);
      const fila = yield call(filtroService.aplicarFiltros, campos);
      yield put(filaActions.atualizarStore(fila));

      if (action.type !== filtroTypes.ORDENAR) {
        yield put({ type: filtroTypes.ATIVA_FILTRO });
      }
    }
  })
}

function* limparFiltros(action) {
  const tipo = yield select(filtroSelectors.getTipoFiltro);
  const ordenacao = yield select(filtroSelectors.getOrdenarPor);

  const campos = {
    tipo,
    pagina: 1,
    ordenacao,
    palavraChave: "",
  };

  yield* flow({
    type: action.type,

    fnTry: function* () {
      yield put({ type: filtroTypes.RESET_PALAVRA_CHAVE });
      yield put({ type: filtroTypes.RESET_CAMPOS_AVANCADO });
      yield put({ type: classificacaoTypes.ZERAR_SELECIONADO });
      yield put({ type: tarefaTypes.ZERAR_SELECIONADO });
      yield put({ type: interessadoTypes.ZERAR_SELECIONADO });

      yield delay(250);
      const fila = yield call(filaService.carregar, campos);
      yield put(filaActions.atualizarStore(fila));
      yield put({ type: filtroTypes.DESATIVA_FILTRO });
    }
  });
}
