import http from "@/utils/http";
import * as actions from "./common";
import {BANNER_DETAIL, BANNER_DETAIL_CLEAR} from "./banner";

//导航列表
export const NAVIGATION_LIST = "NAVIGATION_LIST";

//导航详情
export const NAVIGATION_DETAIL = "NAVIGATION_DETAIL";

export const NAVIGATION_DETAIL_CLEAR = "NAVIGATION_DETAIL_CLEAR"

//获取导航列表
export function getNavigationList(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/navigation/paginate",
      params
    })
      .then(res => {
        dispatch({
          type: NAVIGATION_LIST,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch(actions.pageRequestEnd());
      });
  };
}

//删除导航
export function delNavigation(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/navigation/delete",
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

//编辑导航权重
export function editNavigationSort(data) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/navigation/setting",
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

//获取导航详情
export function getNavigationDetail(params) {
  return dispatch => {
    dispatch(actions.pageRequestStart());
    http({
      url: "/navigation/detail",
      params
    })
        .then(res => {
          dispatch({
            type: NAVIGATION_DETAIL,
            data: res.data.data
          });
        })
        .catch(err => {
          dispatch(actions.pageRequestEnd());
        });
  };
}

//清除缓存
export function clearNavigationDetail() {
  return { type: NAVIGATION_DETAIL_CLEAR };
}