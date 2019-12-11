import * as actions from "../actions/hotGoods";

const initialState = {
  hotTotal: 0,
  hotGoods: []
};

const defaultAction = {
  type: "doNothing"
};

const hotGoods = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.HOT_GOODS_LIST:
      return Object.assign({}, state, {
        hotGoods: action.data.data,
        hotTotal: action.data.total
      });

    default:
      return state;
  }
};

export default hotGoods;
