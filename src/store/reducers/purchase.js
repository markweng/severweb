import {
  //拍照订单列表
  PURCHASE_ORDER_LIST_SUCCESS,
  //拍照订单详情
  PURCHASE_ORDER_DETAIL_SUCCESS,
  //拍照订单操作记录
  PURCHASE_ORDER_RECORD_SUCCESS
} from "../actions/purchase";

const initialState = {
  orderListTotal: 0,
  // loading: true,
  purchaseOrderArray: [],
  purchaseDetail: {},
  operateArray: [],
  operateEnd: false
};

const purchase = (state = initialState, action = {}) => {
  switch (action.type) {
    //拍照订单列表
    case PURCHASE_ORDER_LIST_SUCCESS:
      return Object.assign({}, state, {
        orderListTotal: action.data.total,
        purchaseOrderArray: action.data.data
      });

    //拍照订单详情
    case PURCHASE_ORDER_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        purchaseDetail: action.data
      });

    //拍照订单操作记录
    case PURCHASE_ORDER_RECORD_SUCCESS:
      return Object.assign({}, state, {
        operateArray: action.data
      });

    default:
      return state;
  }
};

export default purchase;
