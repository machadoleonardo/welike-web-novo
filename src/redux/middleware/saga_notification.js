import {call, put, takeEvery} from 'redux-saga/effects';

import {flow} from '../modules/flow';
import {noticationActions, notificationTypes} from '../modules/notification';
import campaignService from '../../commons/services/campaign';

export default function* notificationSaga() {
    yield takeEvery(notificationTypes.ATUALIZAR_NOTIFICACOES, getNotifications);
}

function* getNotifications(action) {
    yield* flow({
        type: action.type,

        fnTry: function* () {
            const campaigns = yield call(campaignService.result);
            // const campaigns = [];
            yield put(noticationActions.atualizarState(campaigns));
        },
    });
}