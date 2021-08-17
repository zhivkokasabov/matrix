import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as articlesActions from '../redux/actions/articlesActions';
import { bindActionCreators } from 'redux';
import './SearchPage.scss';

const SearchPage = (props) => {
  const history = useHistory();
  const [timeForCompletion, setTimeForCompletion] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    getArticles(history.location);
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      getArticles(location);
    });
  }, [history]);

  const getArticles = (location) => {
    const searchString = location.search.slice(1);

    const date = new Date();

    return props.actions.getArticles(searchString).then((articles) => {
      const diff = ((new Date() - date) / 1000)
        .toFixed(2)
        .replace('.', ',');

      setTotal(
        articles.meta.totalResults
          .toString()
          .split('')
          .reverse()
          .map((x, i) => (i + 1) % 3 === 0 ? ` ${x}` : x)
          .reverse()
          .join('')
      );

      setTimeForCompletion(diff);
    });
  }

  return (
    <div className="search-page">
      {
        timeForCompletion ?
          (<div className="search-page__info search-page--grey">
            <span>Около {total} резултата</span>
            <span>({timeForCompletion}) секунди</span>
          </div>) : (null)
      }
      <div className="search-page__articles">
        {
          props.articles.articles.map(x => {
            return (
              <div key={x.id} className="search-page__article">
                <div className="search-page__article-title">
                  {x.url}
                </div>
                <div className="search-page__article-nav">
                  <Link to={{ pathname: x.url}} target="_blank">{x.title}</Link>
                </div>
                <div className="search-page__article-desc">
                  <span className="search-page--grey">{x.date}</span> &#8212; {x.description}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getArticles: bindActionCreators(articlesActions.getArticles, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
