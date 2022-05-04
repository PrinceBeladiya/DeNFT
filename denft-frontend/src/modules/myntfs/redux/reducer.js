import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    NFTList: [],
    address: '',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_LIST:
            return {
                ...state,
                address: action.payload.address,
                NFTList: action.payload.list,
            };
        case actionTypes.UPDATE_LIST:
            return {
                ...state,
                NFTList: action.payload.list,
                address: action.payload.address,
            };
        default:
            return state;
    }
};