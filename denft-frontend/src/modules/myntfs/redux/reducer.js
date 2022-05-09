import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    NFTList: [],
    loading: false,
    transferableToken: '',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_NFT_LISt:
            return {
                ...state,
                NFTList: action.payload,
            };
        case actionTypes.LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case actionTypes.TRANSFERABLETOKEN:
            return {
                ...state,
                transferableToken: action.payload,
            };
            case actionTypes.UPDATE_SELL_OPEN:
            return {
                ...state,
                sellOpen: action.payload,
            };
        default:
            return state;
    }
};