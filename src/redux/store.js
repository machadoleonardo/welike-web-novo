import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import sagas from './middleware/sagas'

export const configureStore = (history) => {
  // saga
  const sagaMiddleware = createSagaMiddleware();

  const reducerWithRouter = connectRouter(history)(reducers);

  const store = createStore(
    reducerWithRouter,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history)
        , sagaMiddleware
      )));

  // iniciando as sagas
  let sagaTask = sagaMiddleware.run(function* () {
    yield sagas()
  });

  // hot module replacement
  if (module.hot) {
    // recarregando os reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = connectRouter(history)(reducers);
      store.replaceReducer(nextRootReducer);
    });

    // recarregando as sagas
    module.hot.accept('./middleware/sagas', () => {
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(function* replacedSaga(action) {
          yield sagas()
        })
      })
    });
  }

  return store;
};