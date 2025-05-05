
import { toast } from "react-toastify";
import { all, put, takeEvery } from "redux-saga/effects";
import { sendMessages } from "../../firebase/services";
import store from "../store";




function* setMessages(action) {
  try {
    const messages = action.payload;

    yield put({ type: "SAVE_MESSAGES", payload: messages });

  } catch (error) {
    toast.error(error.message);
  }
}

function* sendMessageWorker(action) {
  console.log("sendMessageWorker", action.payload);
  try {
    yield sendMessages({ ...action.payload, senderEmail: store.getState().auth.data.email });
    console.log("Document written with ID: ",);
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error(error.message);
  }
}



export function* messageWatcher() {
  yield all([
    takeEvery("SET_MESSAGES", setMessages),
    takeEvery("SEND_MESSAGE", sendMessageWorker),
  ]);
}

