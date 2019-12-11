import * as actions from "../actions/orderList";
import { GET_ORDER_RECORD_SUCCESS } from "../actions/orderList";

const initialState = {
  orderRecordList: [],
  orderList: [],
  total: 0,
  loading: false,

  loadDetail: false,
  detail: {}
};

const defaultAction = {
  type: "doNothing"
};

const orderList = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.GET_ORDER_LIST_REQUEST:
      return Object.assign({}, state, { loading: true });
    case actions.GET_ORDER_LIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        total: action.data.total,
        orderList: action.data.data
      });
    case actions.GET_ORDER_LIST_FAILED:
      return Object.assign({}, state, { loading: false });

    case actions.GET_ORDER_DETAIL_REQUEST:
      return Object.assign({}, state, { loadDetail: true });
    case actions.GET_ORDER_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        loadDetail: false,
        detail: action.data
      });
    case actions.GET_ORDER_DETAIL_FAILED:
      return Object.assign({}, state, { loadDetail: false });

    case actions.GET_ORDER_RECORD_SUCCESS:
      return Object.assign({}, state, { orderRecordList: action.data });
    default:
      return state;
  }
};

export default orderList;
