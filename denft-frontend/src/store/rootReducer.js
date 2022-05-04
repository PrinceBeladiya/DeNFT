import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import landingReducer from '../modules/landing/redux/reducer';
import mynftReducer from '../modules/myntfs/redux/reducer';

const appReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  landing: landingReducer,
  mynft: mynftReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
