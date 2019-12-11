import {TITLE_NAME} from "../actions/titleName";

const initialState = {
    titleName: '首页'
};

const titleName = (state = initialState, action = {}) => {
    switch (action.type) {
        case TITLE_NAME:
            return Object.assign({}, state, {titleName: action.data.join(" / ")});
        default:
            return state
    }
};

export default titleName;