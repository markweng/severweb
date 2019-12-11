import * as actions from "../actions/activity";

const initialState = {
    loadActivityGoodsList: false,
    activityGoodsList: [],
    total: 0,
};

const defaultAction = {
    type: "doNothing"
};

const activityGoodsList = (state = initialState, action = defaultAction) => {
    //活动商品列表
    switch (action.type) {
        case actions.GET_AVTIVITY_GOODS_LIST_REQUEST:
            return { ...state, loadActivityGoodsList: true };
        case actions.GET_AVTIVITY_GOODS_LIST_SUCCESS:
            return {
                ...state,
                loadActivityGoodsList: false,
                total: action.data.data.total,
                activityGoodsList: action.data.data.data
            };
        case actions.GET_AVTIVITY_GOODS_LIST_FAILED:
            return { ...state, loadActivityGoodsList: false };

        default:
            return state;
    }
};

export default activityGoodsList;
