import * as actionTypes from './actionTypes';

export const getData = (data) => ({
  type: actionTypes.GET_DATA,
  payload: data,
});
