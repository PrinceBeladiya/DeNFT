import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  loading: false,
  data: {},
};


export default (state = INITIAL_STATE, action) => { // eslint-disable-line
  switch (action.type) {
    case actionTypes.GET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
