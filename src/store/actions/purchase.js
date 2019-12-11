import http from "@/utils/http";
import * as actions from "./common";

//拍照订单列表
export const PURCHASE_ORDER_LIST_SUCCESS = "PURCHASE_ORDER_LIST_SUCCESS";

//拍照订单详情
export const PURCHASE_ORDER_DETAIL_SUCCESS = "PURCHASE_ORDER_DETAIL_SUCCESS";

//拍照订单操作记录
export const PURCHASE_ORDER_RECORD_SUCCESS = "PURCHASE_ORDER_RECORD_SUCCESS";

//获取拍照订单列表
export function getPurchaseOrderList(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/order/picture/paginate",
      params
    })
      .then(res => {
        dispatch({
          type: PURCHASE_ORDER_LIST_SUCCESS,
          data: res.data.data
        });
        dispatch(actions.pageRequestEnd());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//删除拍照订单
export function delPurchaseOrder(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/order/picture/del",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestRefreshOn());
        dispatch(actions.pageRequestEnd());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//获取拍照订单详情
export function getPurchaseOrderDetail(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/order/picture/get",
      params
    })
      .then(res => {
        dispatch({
          type: PURCHASE_ORDER_DETAIL_SUCCESS,
          data: res.data.data
        });
        dispatch(actions.pageRequestEnd());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//获取拍照订单操作记录
export function getPurchaseOrderRecord(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/order/picture/records",
      params
    })
      .then(res => {
        dispatch({
          type: PURCHASE_ORDER_RECORD_SUCCESS,
          data: res.data.data
        });
        dispatch(actions.pageRequestEnd());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//取消订单
export function cancelPurchaseOrder(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/order/picture/cancel",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestEnd());
        dispatch(actions.pageRequestRefreshOn());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//确认订单
export function confirmPurchaseOrder(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/order/picture/confirm",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestEnd());
        dispatch(actions.pageRequestRefreshOn());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//备注订单
export function remarkPurchaseOrder(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/order/picture/remark",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestEnd());
        dispatch(actions.pageRequestRefreshOn());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}