import * as actionTypes from './actionTypes';

export const updateNFT = (data) => ({
    type : actionTypes.UPDATE_NFT_LISt,
    payload : data,
});

export const updateLoading = (data) => ({
    type : actionTypes.LOADING,
    payload : data,
});

export const updateTransferableToken = (data) => ({
    type : actionTypes.TRANSFERABLETOKEN,
    payload : data,
});