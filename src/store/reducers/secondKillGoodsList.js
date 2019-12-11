import * as actions from "../actions/activity";

const initialState = {
    //活动列表
    loadSecondKillGoodsList: false,
    secondKillGoodsList: [],
    total: 0,
};

const defaultAction = {
    type: "doNothing"
};

const list = (state = initialState, action = defaultAction) => {
    //秒杀商品列表
    switch (action.type) {
        case actions.GET_SECOND_KILL_GOODS_LIST_REQUEST:
            return { ...state, loadSecondKillGoodsList: true };
        case actions.GET_SECOND_KILL_GOODS_LIST_SUCCESS:
            return {
                ...state,
                loadSecondKillGoodsList: false,
                total: action.data.data.total,
                secondKillGoodsList: action.data.data.data
            };
        case actions.GET_SECOND_KILL_GOODS_LIST_FAILED:
            return { ...state, loadSecondKillGoodsList: false };

        default:
            return state;
    }
};

export default list;
