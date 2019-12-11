import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import common from "./reducers/common";
import login from "./reducers/login";
import titleName from "./reducers/titleName";
import banner from "./reducers/banner";
import orderList from "./reducers/orderList";
import purchase from "./reducers/purchase";
import user from "./reducers/user";
import dialog from "./reducers/dialog";
import searchKey from "./reducers/searchKey";
import hotGoods from "./reducers/hotGoods";
import navigation from "./reducers/navigation";
import recommend from "./reducers/recommend";
import recommendGoods from "./reducers/recommendGoods";
import statistics from "./reducers/statistics";
import firstCamp from "./reducers/firstCamp";


import activity from "./reducers/activity";
import activityGoodsList from "./reducers/activityGoodsList";
import secondKillGoodsList from "./reducers/secondKillGoodsList";
const config = {
  key: "operation_0.0.2",
  storage: storage,
  whitelist: ["login"] //持久化白名单
};

const rootReducer = combineReducers({
  common,
  searchKey,
  hotGoods,
  navigation,
  firstCamp,
  recommend,
  recommendGoods,
  login,
  titleName,
  banner,
  orderList,
  purchase,
  dialog,
  user,
  activity,
  activityGoodsList,
  secondKillGoodsList,
  sales: statistics
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);

export default createStore(persistReducer(config, rootReducer), enhancer);
