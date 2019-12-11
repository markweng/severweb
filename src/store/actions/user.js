import { message } from "antd";
import http from "@/utils/http";
import history from "@/utils/history";

//获取用户列表
export const GET_USER_LIST_REQUEST = "GET_USER_LIST_REQUEST";
export const GET_USER_LIST_SUCCESS = "GET_USER_LIST_SUCCESS";
export const GET_USER_LIST_FAILED = "GET_USER_LIST_FAILED";

//获取用户详情
export const GET_USER_DETAIL_REQUEST = "GET_USER_DETAIL_REQUEST";
export const GET_USER_DETAIL_SUCCESS = "GET_USER_DETAIL_SUCCESS";
export const GET_USER_DETAIL_FAILED = "GET_USER_DETAIL_FAILED";

//添加用户
export const ADD_USER_SATRT = "ADD_USER_SATRT";
export const ADD_USER_OVER = "ADD_USER_OVER";

//操作记录
export const GET_RECORD_LIST_REQUEST = "GET_RECORD_LIST_REQUEST";
export const GET_RECORD_LIST_SUCCESS = "GET_RECORD_LIST_SUCCESS";
export const GET_RECORD_LIST_FAILED = "GET_RECORD_LIST_FAILED";

//获取用户列表
export function getUserList(params) {
  return dispatch => {
    dispatch({ type: GET_USER_LIST_REQUEST });
    http({
      url: "/ordinary.user.paginate",
      params
    })
      .then(res => {
        dispatch({
          type: GET_USER_LIST_SUCCESS,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch({ type: GET_USER_LIST_FAILED });
      });
  };
}

//获取用户详情
export function getUserDetail(params) {
  return dispatch => {
    dispatch({ type: GET_USER_DETAIL_REQUEST });
    http({
      url: "/ordinary.user.get",
      params
    })
      .then(res => {
        dispatch({
          type: GET_USER_DETAIL_SUCCESS,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_USER_DETAIL_FAILED
        });
      });
  };
}

//添加用户
export function addUser(data) {
  return dispatch => {
    dispatch({ type: ADD_USER_SATRT });
    http({
      url: "/user/add",
      data,
      method: "post"
    })
      .then(res => {
        dispatch({ type: ADD_USER_OVER });
        history.go(-1);
        message.success("添加成功");
      })
      .catch(err => {
        dispatch({ type: ADD_USER_OVER });
      });
  };
}

//获取操作记录
export function getRecordList(params) {
  return dispatch => {
    dispatch({ type: GET_RECORD_LIST_REQUEST });
    http({
      url: "/user/record",
      params
    })
      .then(res => {
        dispatch({
          type: GET_RECORD_LIST_SUCCESS,
          data: res.data.data
        });
      })
      .catch(err => {
        dispatch({ type: GET_RECORD_LIST_FAILED });
      });
  };
}
