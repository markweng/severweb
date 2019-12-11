import http from "@/utils/http";
import * as actions from "./common";

//拍照订单列表
export const RECOMMEND_GOODS_LIST = "RECOMMEND_GOODS_LIST";

//获取拍照订单列表
export function getRecommendGoods(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketingGoods/list",
      params
    })
        .then(res => {
          dispatch({
            type: RECOMMEND_GOODS_LIST,
            data: res.data.data
          });
        })
        .catch(err => {
          dispatch(actions.pageRequestEnd());
        });
  };
}

//设置商品权重
export function setRecommendGoodsSort(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketingGoods/Setting",
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
export function addRecommendGoods(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketingGoods/add",
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
export function delRecommendGoods(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketingGoods/delete",
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
