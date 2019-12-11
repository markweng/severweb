import http from "@/utils/http";
import * as actions from "./common";

//拍照订单列表
export const SEARCH_KEY = "SEARCH_KEY";

export const SEARCH_KEY_EDIT = "SEARCH_KEY";

//获取拍照订单列表
export function getSearchKeyList(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/keyword.paginate",
      params
    })
      .then(res => {
        dispatch({
          type: SEARCH_KEY,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

export function addSearchKey(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/keyword.add",
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

export function setSearchKey(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/keyword.edit",
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

export function delSearchKey(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/keyword.delete",
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
