import * as actions from "../actions/activity";

const initialState = {
    //活动列表
    loadActivityList: false,
    activityList: [],
    total: 0,

    
};

const defaultAction = {
    type: "doNothing"
};

const activity = (state = initialState, action = defaultAction) => {
    //活动列表
    switch (action.type) {
        case actions.GET_AVTIVITY_LIST_REQUEST:
            return { ...state, loadActivityList: true };
        case actions.GET_AVTIVITY_LIST_SUCCESS:
            return {
                ...state,
                loadActivityList: false,
                total: action.data.data.total,
                activityList: action.data.data.data
            };
        case actions.GET_AVTIVITY_LIST_FAILED:
            return { ...state, loadActivityList: false };


        default:
            return state;
    }
};

export default activity;
