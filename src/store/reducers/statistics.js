import * as actions from "../actions/statistics";

const initialState = {
  salesList: [],
  salesTotal: 0,

  purchaseList: [],
  purchaseTotal: 0
};

const defaultAction = {
  type: "doNothing"
};

const statistics = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case actions.SALES_LIST:
      return Object.assign({}, state, {
        salesList: action.data.data,
        salesTotal: action.data.total
      });

    case actions.PURCHASE_LIST:
      return Object.assign({}, state, {
        purchaseList: action.data.data,
        purchaseTotal: action.data.total
      });

    default:
      return state;
  }
};

export default statistics;
