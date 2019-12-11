import http from "@/utils/http";
import * as actions from "./common";

export const SALES_LIST = "SALES_LIST";

export const PURCHASE_LIST = "PURCHASE_LIST";

//商家销量统计列表
export function getSales(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/sellerData/list",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestEnd());
        dispatch({
          type: SALES_LIST,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//商家销量统计列表
export function getPurchase(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/userData/list",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestEnd());
        dispatch({
          type: PURCHASE_LIST,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}
