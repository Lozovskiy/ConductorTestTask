import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import rootSaga from "./saga";

const version = !!process.env.REACT_APP_VERSION ? +process.env.REACT_APP_VERSION.split(".").join("") : -1;

const persistConfig = {
  whitelist: [],
  key: "root",
  storage,
  version,
  migrate: createMigrate({
    [version]: (state) => state,
  }),
};

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();
const middleware =
  process.env.REACT_APP_ENV === "dev" || process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
    : applyMiddleware(sagaMiddleware);
const store = createStore(persistedReducer, middleware);
export let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;

if (process.env.NODE_ENV === "development") {
  window.store = store;
}
