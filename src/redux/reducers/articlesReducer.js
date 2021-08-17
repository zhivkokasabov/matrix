import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function articlesReducer(state = initialState.articles, action) {
  switch (action.type) {
    case types.GET_ARTICLES_SUCCESS:
      return {
        ...action.articles,
        articles: action.articles.articles.map(x => ({
          ...x
        }))
      };
    default:
      return state;
  }
}
