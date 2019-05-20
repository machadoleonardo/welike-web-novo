import {all, call, put, select, takeEvery} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import filaService from '../../commons/services/fila';
import {filaActions, filaSelectors, filaTypes} from '../modules/fila';
import {flow} from '../modules/flow';

export default function* configuracoesSaga() {
  yield takeEvery(filaTypes.CARREGAR, carregar);
  yield takeEvery(filaTypes.ATUALIZAR_PROCESSO, atualizarProcesso);
  yield takeEvery(filaTypes.ATRIBUIR_TAREFA, atribuirTarefa);
  yield takeEvery(filaTypes.DESATRIBUIR_TAREFA, desatribuirTarefa);
}

function* carregar(action) {
  yield* flow({
    type: action.type,

    fnTry: function* () {
      if (!action.meta.preserve) {
        // 'resetar' a fila de tarefas        
        yield put(filaActions.atualizarStore({ processos: [], preserve: false }));
      }

      const [fila,] = yield all([
        call(filaService.carregar, action.payload),
        call(delay, 750)
      ]);

      fila.preserve = action.meta.preserve;
      yield put(filaActions.atualizarStore(fila));
    }
  });
}

function* atualizarProcesso(action) {
  const codigo = action.payload.processo;
  const id = `${action.type}_${codigo}`;

  yield* flow({
    type: id,

    fnTry: function* () {
      const fila = yield call(filaService.carregar, action.payload);
      yield put(filaActions.atualizarStoreProcesso({ codigo, processo: fila.processos[0] }));
    }
  });
}

function* atribuirTarefa(action) {
  const codigo = action.payload.tarefa.codigo;
  const id = `${action.type}_${codigo}`;
  const { usuario, tarefa, acaoConfirmar, acaoCancelar } = action.payload;
  
  const tarefaJaAtribuidaAoutroUsuario = yield select(filaSelectors.isTarefaJaAtribuidaAoutroUsuario(tarefa));

  yield* flow({
    type: id,

    fnTry: function* () {

      //verifica se a tarefa no backend já está atribuida a um usuario
      const { usuarioAtribuido } = yield call( filaService.getTarefaJaAtribuida, tarefa.codigo);
      const isTarefaTemCodigoUsuario = usuarioAtribuido.cdUsuario;

      if( isTarefaTemCodigoUsuario && !tarefaJaAtribuidaAoutroUsuario ){
        // exibe dialog para confirmar atribuicao
        yield put(filaActions.setTarefaJaAtribuidaOutroUsuario({ tarefa }))
        return;
      }

     
      if( acaoConfirmar || acaoCancelar ){
        yield put(filaActions.setTarefaNaoAtribuidaOutroUsuario({ tarefa }))

        if(acaoCancelar) return;
      }

        // endpoint
        yield call(filaService.atribuirTarefa, codigo);

        // outros
        yield put(filaActions.setTarefaNaoAtribuidaOutroUsuario({ tarefa }));

        // seta usuario na tarefa     
        yield put( filaActions.atualizarAtribuicaoDesatribuicao({ usuario, tarefa }) );

        // seta se a tarefa atribuida
        yield put(filaActions.setTarefaAtribuida({ tarefa }));
        
        // delay
        yield delay(750);

    },
    fnCatch: function * () {
      yield put( filaActions.setErroAtribuicaoDesatribuicao({tarefa}));
    },
  });
}

function* desatribuirTarefa(action) {
  const codigo = action.payload.tarefa.codigo;
  const id = `${action.type}_${codigo}`;
  const { tarefa } = action.payload;
  
  yield* flow({
    type: id,

    fnTry: function* () {
      yield all([
        yield call(filaService.desatribuirTarefa, codigo),
        yield delay(750),
        yield put(filaActions.atualizarAtribuicaoDesatribuicao({ usuario: null, tarefa })),
        yield put(filaActions.setTarefaDesatribuida({tarefa}))
      ]);
    },
    fnCatch: function * () {
      yield put( filaActions.setErroAtribuicaoDesatribuicao({tarefa}));
    },
  });
}