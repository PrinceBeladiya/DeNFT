import * as actionTypes from './actionTypes';

export const getData = (data) => ({
    type : actionTypes.GET_LIST,
    payload : data,
});

export const updateData = (data) => ({
    type : actionTypes.UPDATE_LIST,
    payload : data,
});
