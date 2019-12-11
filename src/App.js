import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import { persistStore } from "redux-persist";
import { Router } from "react-router-dom";
import Routes from "./routes/index";
import history from "./utils/history";
import "moment/locale/zh-cn";

const persistor = persistStore(store);

function App() {
  return (
    <LocaleProvider locale={zh_CN}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
    </LocaleProvider>
  );
}

export default App;
