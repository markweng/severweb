import {
  //拍照订单列表
  SEARCH_KEY
} from "../actions/searchKey";

const initialState = {
  keyList: [],
  keyTotal: 0
};

const purchase = (state = initialState, action = {}) => {
  switch (action.type) {
    //拍照订单列表
    case SEARCH_KEY:
      return Object.assign({}, state, {
        keyList: action.data.data,
        keyTotal: action.data.total
      });

    default:
      return state;
  }
};

export default purchase;
