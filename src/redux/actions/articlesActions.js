import * as types from "./actionTypes";
import * as articlesApi from "../../api/articlesApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function getArticlesSuccess(articles) {
  return { type: types.GET_ARTICLES_SUCCESS, articles };
}

export function getArticles(searchString) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return articlesApi
      .getArticles(searchString)
      .then(articles => {
        dispatch(getArticlesSuccess(articles));

        return articles;
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
