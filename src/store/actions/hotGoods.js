import http from "@/utils/http";
import * as actions from "./common";

//拍照订单列表
export const HOT_GOODS_LIST = "HOT_GOODS_LIST";

//获取拍照订单列表
export function getHotGoods(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/hot.paginate",
      params
    })
      .then(res => {
        dispatch({
          type: HOT_GOODS_LIST,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//设置商品权重
export function setHotGoodsSort(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/hot.edit",
      method: "POST",
      data
    })
      .then(res => {
        dispatch(actions.pageRequestRefreshOn());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//添加商品
export function addGoods(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/hot.add",
      method: "POST",
      data
    })
      .then(res => {
        dispatch(actions.pageRequestRefreshOn());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//删除商品
export function delHotGoods(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/hot.delete",
      method: "POST",
      data
    })
      .then(res => {
        dispatch(actions.pageRequestRefreshOn());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}
