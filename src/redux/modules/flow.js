import _ from 'lodash';

import { createAction, handleActions } from 'redux-actions';
import { put, call } from 'redux-saga/effects';

// ACTION TYPES
const RESET = `${process.env.PUBLIC_URL}/FLOW/RESET`;
const RESET_BY_TYPE = `${process.env.PUBLIC_URL}/FLOW/RESET_BY_TYPE`;
const INVERT_BY_TYPE = `${process.env.PUBLIC_URL}/FLOW/INVERT_BY_TYPE`;
const START = `${process.env.PUBLIC_URL}/FLOW/START`;
const PROGRESS = `${process.env.PUBLIC_URL}/FLOW/PROGRESS`;
const SUCCESS = `${process.env.PUBLIC_URL}/FLOW/SUCCESS`;
const FAIL = `${process.env.PUBLIC_URL}/FLOW/FAIL`;

export const types = {
  RESET,
  INVERT_BY_TYPE,
  START,
  SUCCESS,
  PROGRESS,
  FAIL,
};

// ACTIONS
const reset = createAction(RESET);
const start = createAction(START);
const progress = createAction(PROGRESS);
const success = createAction(SUCCESS);
const fail = createAction(FAIL);
const resetByType = createAction(RESET_BY_TYPE, payload => payload);
const invertByType = createAction(INVERT_BY_TYPE, payload => payload)
export const actions = {
  reset,
  start,
  progress,
  success,
  fail,
  resetByType,
  invertByType
};


// INITIAL STATE
const initialState = {};

// REDUCERS
const reducer = handleActions({
  [START]: (state, action) => {
    const type = action.payload;
    return { ...state, [type]: { loading: true, done: false } };
  },
  [SUCCESS]: (state, action) => {
    const type = action.payload;
    return { ...state, [type]: { loading: false, done: true } };
  },
  [PROGRESS]: (state, action) => {
    const { type } = action.payload;
    const oldProgress = state[type].progress || {};

    let proximaTarefa = 0;
    if (oldProgress.atual !== undefined) {
      proximaTarefa = oldProgress.atual + 1;
    }
    const progress = { ...oldProgress, ...action.payload.progress, atual: proximaTarefa };
    return { ...state, [type]: { ...state[type], progress } };
  },
  [FAIL]: (state, action) => {
    const { type, erro_tipo, erro_mensagem, erro_data } = action.payload;
    return { ...state, [type]: { loading: false, done: true, erro_tipo, erro_mensagem, erro_data } };
  },
  [RESET]: (state, action) => {
    const types = action.payload;
    return _.omit(state, types);
  },
  [RESET_BY_TYPE]: (state, action) => {
    return _.omit(state, [action.payload]);
  },
  [INVERT_BY_TYPE]: (state, action) => {
    return state;
  },
}, initialState);

export default reducer;


// SELECTORS
const isLoading = (state) => {
  return undefined !== _.find(state.flow, function (f) { return f.loading === true });
}

const isLoadingByType = (state, ...types) => {
  const loading = _.find(types, (type) => {
    return Boolean((state.flow[type] || {}).loading);
  });
  return loading !== undefined;
}

const isLoadingByTypeRecursive = (...types) => (state) => {
  const loading = _.find(types, (type) => {
    return Boolean((state.flow[type] || {}).loading);
  });
  return loading !== undefined;
}


const getErrorByType = (state, ...types) => {
  const flow = _.map(types, type => state.flow[type] || {})
    .find((f) => {
      return Boolean(f.erro_mensagem);
    });

  if (flow === undefined) {
    return undefined;
  }
  return flow.erro_mensagem;
}

const isSuccessByType = (state, ...types) => {
  const flows = _.map(types, type => state.flow[type] || {})
    .filter((f) => {
      const { loading, erro_mensagem } = f;
      return Boolean(loading === false && erro_mensagem === undefined);
    });
  return flows.length === types.length;
}

const isDoneByType = (state, ...types) => {
  const flows = _.map(types, type => state.flow[type] || {})
    .filter((f) => {
      return f.done;
    });

  return flows.length === types.length;
}

const getProgressByType = (state, type) => {
  const flow = state.flow[type] || {};
  return flow.progress;
}

export const selectors = {
  isLoading,
  isLoadingByType,
  isSuccessByType,
  isDoneByType,
  getErrorByType,
  getProgressByType,
  isLoadingByTypeRecursive
};

// HELPERS
export function* flow(options) {
  const {
    type,
    fnTry,
    fnCatch,
    fnFinally,
  } = options;

  try {
    // inicia o 'fluxo'
    yield put(actions.start(type));

    // invoca a função 'try'
    yield call(fnTry);

    // finaliza com sucesso o 'fluxo'
    yield put(actions.success(type));

  } catch (e) {
    console.error(e);
    try {
      if (fnCatch) {
        // invoca a função 'catch'
        yield call(fnCatch);
      }
    } finally {
      // error msg 
      const erro = extrairErro(e);

      // finaliza com o erro original o fluxo
      yield put(actions.fail({ type, erro_tipo: erro.tipo, erro_mensagem: erro.mensagem }));
    }
  } finally {
    if (fnFinally) {
      // invoca a função 'finally'
      yield call(fnFinally);
    }
  }
}

function extrairErro(e) {
  let tipo = 'RUNTIME';
  let mensagem = _.get(e, 'response.data');

  if (_.get(e, 'response.status') === 404) {
    mensagem = 'Aconteceu um erro no servidor durante o processamento de sua requisição. Tente novamente mais tarde.';
  }

  if (mensagem && mensagem.message) {
    mensagem = mensagem.message;
  }

  return { tipo, mensagem };
}