import * as actions from "../actions/recommendGoods";

const initialState = {
  recommendTotal: 0,
  recommendGoods: []
};

const defaultAction = {
  type: "doNothing"
};

const recommendGoods = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.RECOMMEND_GOODS_LIST:
      return Object.assign({}, state, {
        recommendGoods: action.data.data,
        recommendTotal: action.data.total
      });

    default:
      return state;
  }
};

export default recommendGoods;
