import * as actions from "../actions/banner";
import { MARKET_LIST_SUCCESS } from "../actions/banner";
import { BANNER_DETAIL } from "../actions/banner";
import {BANNER_LIST_EDIT} from "../actions/banner";

const initialState = {
  bannerTotal: 0,
  banner: [],
  market: {
    data: [],
    total: 0
  },
  bannerDetail: {}
};

const defaultAction = {
  type: "doNothing"
};

const banner = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.BANNER_LIST_SUCCESS:
      return Object.assign({}, state, {
        banner: action.data.data,
        bannerTotal: action.data.total
      });

    case actions.BANNER_DETAIL:
      return Object.assign({}, state, {
        bannerDetail: action.data
      });
      break;

    case actions.BANNER_DETAIL_CLEAR:
      return Object.assign({}, state, {
        bannerDetail: {}
      });
      break;

    case actions.MARKET_LIST_SUCCESS:
      return Object.assign({}, state, {
        market: action.data
      });
    default:
      return state;
  }
};

export default banner;
