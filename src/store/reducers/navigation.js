import * as actions from "../actions/navigation";
import { NAVIGATION_DETAIL } from "../actions/navigation";
import { NAVIGATION_DETAIL_CLEAR } from "../actions/navigation";

const initialState = {
  navigationTotal: 0,
  navigationList: [],
  navigationDetail: {}
};

const defaultAction = {
  type: "doNothing"
};

const navigation = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.NAVIGATION_LIST:
      return Object.assign({}, state, {
        navigationList: action.data.data,
        navigationTotal: action.data.total
      });
    case actions.NAVIGATION_DETAIL:
      return Object.assign({}, state, {
        navigationDetail: action.data
      });

    case actions.NAVIGATION_DETAIL_CLEAR:
      return Object.assign({}, state, {
        navigationDetail: {}
      });
      break;

      break;

    default:
      return state;
  }
};

export default navigation;
