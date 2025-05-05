import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistedReducer } from "./rootReducer";
import persistStore from "redux-persist/es/persistStore";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});


sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);
export default store;
