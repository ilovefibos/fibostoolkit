import { takeLatest, all } from 'redux-saga/effects';
import { CHANGE_LOCALE } from './constants';
import * as storage from "../../utils/storage"; // eslint-disable-line

function* saveLocale(action) {
  try {
    yield storage.put('locale', action.locale);
  } catch (err) {
    console.error(err);
  }
}

function* watchChangeLocale() {
  yield takeLatest(CHANGE_LOCALE, saveLocale);
}

//
// Combine sagas into root saga
//
export default function* rootSaga() {
  yield all([watchChangeLocale()]);
}
