import http from "@/utils/http";
import history from "@/utils/history";
import * as actions from "./common";

export const RECOMMEND_LIST = "RECOMMEND_LIST";

export const RECOMMEND_DETAIL = "RECOMMEND_DETAIL";

export const RECOMMEND_CLEAR = "RECOMMEND_CLEAR";

export function getRecommendList(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketing/list",
      params
    })
      .then(res => {
        dispatch({
          type: RECOMMEND_LIST,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

export function getRecommendDetail(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketing/detail",
      params
    })
      .then(res => {
        dispatch({
          type: RECOMMEND_DETAIL,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

export function setRecommendSort(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketing/setting",
      method: "post",
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

export function addRecommend(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketing/add",
      method: "post",
      data
    })
      .then(res => {
        history.goBack();
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

export function setRecommend(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketing/edit",
      method: "post",
      data
    })
      .then(res => {
        history.goBack();
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

export function delRecommend(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/marketing/delete",
      method: "post",
      data
    })
      .then(res => {
        history.goBack();
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

export function clearRecommend() {
  return {
    type: RECOMMEND_CLEAR
  };
}
