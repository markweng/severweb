import * as actions from "../actions/recommend";

const initialState = {
  recommendTotal: 0,
  recommendList: [],

  recommendDetail: {}
};

const defaultAction = {
  type: "doNothing"
};

const navigation = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.RECOMMEND_LIST:
      return Object.assign({}, state, {
        recommendList: action.data.data,
        recommendTotal: action.data.total
      });

    case actions.RECOMMEND_DETAIL:
      return Object.assign({}, state, {
        recommendDetail: action.data
      });
    case actions.RECOMMEND_CLEAR:
      return Object.assign({}, state, {
        recommendDetail: {}
      });
    default:
      return state;
  }
};

export default navigation;
