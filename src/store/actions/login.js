import http from "@/utils/http";
import history from "@/utils/history";

//登录
export const LOGIN = "LOGIN";

//获取登录人信息
export const GET_USER_INFO = "GET_USER_INFO";

//退出登录清空登录信息
export const CLEAR_LOGIN_INFO = "CLEAR_LOGIN_INFO";

//登录
export function login(data) {
  return dispatch => {
    http({
      url: "/login",
      data,
      method: "post"
    }).then(res => {
      dispatch({
        type: LOGIN,
        data: res.data.data
      });
      history.push("/");
    });
  };
}

//获取登录人信息
export function getUserInfo() {
  return dispatch => {
    http({
      url: "/self/get"
    }).then(res => {
      dispatch({
        type: GET_USER_INFO,
        data: res.data.data
      });
    });
  };
}

//退出登录清空登录信息
export function clearLoginInfo() {
  return {
    type: CLEAR_LOGIN_INFO
  };
}
