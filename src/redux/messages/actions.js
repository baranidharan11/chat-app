import store from "../store";

export const actionTypes = {
  SET_MESSAGES: "SET_MESSAGES",
};

export const setMessages = (messages) => {
  store.dispatch({
    type: actionTypes.SET_MESSAGES,
    payload: messages,
  })
}

export const sendMessage = (message) => {
  store.dispatch({
    type: "SEND_MESSAGE",
    payload: message,
  });
}