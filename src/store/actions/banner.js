import http from "@/utils/http";
import * as actions from "./common";

//拍照订单列表
export const BANNER_LIST_SUCCESS = "BANNER_LIST_SUCCESS";

export const BANNER_DETAIL = "BANNER_DETAIL";

export const BANNER_DETAIL_CLEAR = "BANNER_DETAIL_CLEAR";

export const MARKET_LIST_SUCCESS = "MARKET_LIST_SUCCESS";

//获取拍照订单列表
export function getBannerList(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/banner.paginate",
      params
    })
      .then(res => {
        dispatch({
          type: BANNER_LIST_SUCCESS,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//修改权重，状态
export function setBannerStatus(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/banner.setting",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestRefreshOn());
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//推荐专题
export function getBannerDetail(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/banner.detail",
      method: "POST",
      data
    })
      .then(res => {
        dispatch({
          type: BANNER_DETAIL,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//清除缓存
export function clearBannerDetail() {
  return { type: BANNER_DETAIL_CLEAR };
}

//推荐专题
export function getMarket(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketing/paginate",
      params
    })
      .then(res => {
        dispatch({
          type: MARKET_LIST_SUCCESS,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}
