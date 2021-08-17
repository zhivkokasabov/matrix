import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function optionsReducer(state = initialState.options, action) {
  switch (action.type) {
    case types.GET_OPTIONS_SUCCESS:
      return action.options.map(x => ({
        ...x
      }));
    case types.ADD_DEFAULT_OPTION_SUCCESS:
      return action.options.map(x => ({
        ...x
      }));
    case types.GET_DEFAULT_OPTIONS_SUCCESS:
      return action.options.map(x => ({
        ...x
      }));
    case types.REMOVE_DEFAULT_OPTION_SUCCESS:
      return action.options.map(x => ({
        ...x
      }));
    default:
      return state;
  }
}
