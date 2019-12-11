import * as actions from "../actions/user";

const initialState = {
  //用户列表
  loadUserList: false,
  userList: [],
  total: 0,

  //用户详情
  userDetail: {},
  loadUserDetail: false,

  //新增用户
  addUser: false,

  //获取操作记录
  loadRecordList: false,
  recordList: []
};

const defaultAction = {
  type: "doNothing"
};

const user = (state = initialState, action = defaultAction) => {
  //用户列表
  switch (action.type) {
    case actions.GET_USER_LIST_REQUEST:
      return { ...state, loadUserList: true };
    case actions.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loadUserList: false,
        total: action.data.total,
        userList: action.data.data
      };
    case actions.GET_USER_LIST_FAILED:
      return { ...state, loadUserList: false };

    //用户详情
    case actions.GET_USER_DETAIL_REQUEST:
      return { ...state, loadUserDetail: true };
    case actions.GET_USER_DETAIL_SUCCESS:
      return { ...state, loadUserDetail: false, userDetail: action.data };
    case actions.GET_USER_DETAIL_FAILED:
      return { ...state, loadUserDetail: false };

    //新增用户
    case actions.ADD_USER_SATRT:
      return { ...state, addUser: true };
    case actions.ADD_USER_OVER:
      return { ...state, addUser: false };

    //获取操作备注
    case actions.GET_RECORD_LIST_REQUEST:
      return { ...state, loadRecordList: true };
    case actions.GET_RECORD_LIST_SUCCESS:
      return { ...state, loadRecordList: false, recordList: action.data };
    case actions.GET_RECORD_LIST_FAILED:
      return { ...state, loadRecordList: false };

    default:
      return state;
  }
};

export default user;
