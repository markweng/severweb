import * as actions from '../actions/home';

const initialState = {
    number: 1,
};

const defaultAction = {
    type: 'doNothing'
};

const loading = (state = initialState, action = defaultAction) => {
    switch (action.type) {
        case actions.CHANGE_NUMBER:
            return Object.assign({}, state, { number:action.data});
        default:
            return state;
    }
};

export default loading;