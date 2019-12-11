import * as actions from "../actions/common";

const initialState = {
  loading: false,
  needRefresh: false
};

const defaultAction = {
  type: "doNothing"
};

const loading = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    //请求开始，loading 开启
    case actions.PAGE_REQUEST_START:
      return Object.assign({}, state, { loading: true });
    //请求结束，loading 关闭
    case actions.PAGE_REQUEST_END:
      return Object.assign({}, state, { loading: false });

    //页面开启刷新
    case actions.PAGE_REFRESH_ON:
      return Object.assign({}, state, { needRefresh: true });
    //页面关闭刷新
    case actions.PAGE_REFRESH_OFF:
      return Object.assign({}, state, { needRefresh: false });

    default:
      return state;
  }
};

export default loading;
