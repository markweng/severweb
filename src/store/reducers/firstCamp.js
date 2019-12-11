import * as actions from "../actions/firstCamp";
import { RELATION_APPLY } from "../actions/firstCamp";

const initialState = {
  relationList: [],
  relationTotal: 0,
  relation: {
    list: {
      data: [],
      total: 0
    }
  },
  apply: {
    total: 0,
    data: []
  }
};

const defaultAction = {
  type: "doNothing"
};

const firstCamp = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.RELATION_LIST:
      return Object.assign({}, state, {
        relationList: action.data.data,
        relationTotal: action.data.total
      });
    case actions.RELATION_DETAIL:
      return Object.assign({}, state, {
        relation: action.data
      });
    case actions.RELATION_APPLY:
      return Object.assign({}, state, {
        apply: action.data
      });
    default:
      return state;
  }
};

export default firstCamp;
