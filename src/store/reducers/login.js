import * as actions from "../actions/login";

const initialState = {
  token: "",
  loginUser: ""
};

const defaultAction = {
  type: "doNothing"
};

const login = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    //保存登录信息
    case actions.LOGIN:
      return Object.assign({}, state, { token: action.data.token });

    //获取登录人信息
    case actions.GET_USER_INFO:
      return Object.assign({}, state, {
        loginUser: action.data.nickname
      });

    //退出登录清空登录信息
    case actions.CLEAR_LOGIN_INFO:
      return Object.assign({}, state, {
        token: "",
        loginUser: ""
      });

    default:
      return state;
  }
};

export default login;
