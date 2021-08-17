import * as types from './actionTypes';
import * as optionsApi from '../../api/optionsApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function getOptionsSuccess(options) {
  return { type: types.GET_OPTIONS_SUCCESS, options };
}

export function getDefaultOptionsSuccess(options) {
  return { type: types.GET_DEFAULT_OPTIONS_SUCCESS, options };
}

export function removeDefaultOptionSuccess(options) {
  return { type: types.REMOVE_DEFAULT_OPTION_SUCCESS, options };
}

export function addDefaultOptionSuccess(options) {
  return { type: types.ADD_DEFAULT_OPTION_SUCCESS, options };
}

export function getOptions(searchString) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return optionsApi
      .getOptions(searchString)
      .then(options => {
        dispatch(getOptionsSuccess(options));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function getDefaultOptions() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return optionsApi
      .getDefaultOptions()
      .then(options => {
        dispatch(getDefaultOptionsSuccess(options));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function removeDefaultOption(searchString, option) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return optionsApi
      .removeDefaultOption(searchString, option)
      .then(options => {
        dispatch(removeDefaultOptionSuccess(options));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function addDefaultOption(option) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return optionsApi
      .addDefaultOption(option)
      .then(options => {
        dispatch(addDefaultOptionSuccess(options));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
