import React from "react";
import { Loader } from "semantic-ui-react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "redux/store";

import history from "redux/history";
import RootRouter from "routes/RootRouter/RootRouter";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader active={true} />} persistor={persistor}>
        <Router history={history}>
          <RootRouter />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
