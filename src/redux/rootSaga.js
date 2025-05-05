import { all } from "redux-saga/effects";
import { authWatcher } from "./auth/auth.saga";
import { messageWatcher } from "./messages/messages.saga";

export default function* rootSaga() {
  yield all([authWatcher(), messageWatcher()]);
}


