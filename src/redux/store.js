import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import persistStore from "redux-persist/es/persistStore";
import createSagaMiddleware from "redux-saga";
import { persistedReducer } from "./rootReducer";
import rootSaga from "./rootSaga";


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default store;
