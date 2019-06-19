import {all} from 'redux-saga/effects';
import usuarioSaga from './saga_usuario';
import dashboardSaga from './saga_dashboard';
import notificationSaga from "./saga_notification";
import influencerSaga from "./saga_influencer";

export default function* watchMany() {
    yield all([
        usuarioSaga(),
        dashboardSaga(),
        notificationSaga(),
        influencerSaga(),
    ]);
};