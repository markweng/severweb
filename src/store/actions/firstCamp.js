import http from "@/utils/http";
import * as actions from "./common";

export const RELATION_LIST = "RELATION_LIST";

export const RELATION_DETAIL = "RELATION_DETAIL";

export const RELATION_APPLY = "RELATION_APPLY";

export function getRelationList(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/member/list",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestEnd());
        dispatch({
          type: RELATION_LIST,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

export function getRelationDetail(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/member/get",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestEnd());
        dispatch({
          type: RELATION_DETAIL,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

export function delRelation(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/member/delete",
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

export function loadApplyList(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/purchasingRequisition/list",
      params
    })
      .then(res => {
        dispatch(actions.pageRequestEnd());
        dispatch({
          type: RELATION_APPLY,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

export function applyRelation(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/purchasingRequisition/edit",
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
