import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth.reducer";
import messageReducer from "./messages/messages.reducer";


const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: []
};

const messagePersistConfig = {
  key: "messages",
  storage: storage,
  blacklist: []
};

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth ", "messages"]
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  messages: persistReducer(messagePersistConfig, messageReducer)
});
export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

