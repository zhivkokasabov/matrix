import React, { useEffect, useState } from 'react';
import './App.scss';
import AutocompleteComponent from './components/autocomplete/AutocompleteComponent';
import { connect } from 'react-redux';
import * as optionActions from './redux/actions/optionActions';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

function App(props) {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const searchString = decodeURI(history.location.search.slice(1));

    setSearchValue(searchString);

    if (searchString) {
      props.actions.getOptions(searchString);
    } else {
      props.actions.getDefaultOptions();
    }
  }, []);

  useEffect(() => {
    history.listen((location) => {
      setSearchValue(location.search.slice(1));
    });
  }, [history]);

  const onChange = (searchString) => {
    props.actions.getOptions(searchString);
  }

  const onSelectionChange = (searchString) => {
    const option = props.options.find(x => x.name === searchString);

    if (!option) {
      history.push(`/search/all?${searchString}`);
    } else {
      props.actions.addDefaultOption(option);

      history.push(`/search/all?${option.name}`);
    }
  }

  const onRemove = (option) => {
    props.actions.removeDefaultOption(searchValue, option);
  }

  return (
    <React.Fragment>
      <div className="header">
        <div className="container">
          <AutocompleteComponent
            onChange={onChange}
            onSelectionChange={onSelectionChange}
            onRemove={onRemove}
            options={props.options}
            searchValue={searchValue}
          ></AutocompleteComponent>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
}


function mapStateToProps(state) {
  return {
    options: state.options
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getOptions: bindActionCreators(optionActions.getOptions, dispatch),
      getDefaultOptions: bindActionCreators(optionActions.getDefaultOptions, dispatch),
      removeDefaultOption: bindActionCreators(optionActions.removeDefaultOption, dispatch),
      addDefaultOption: bindActionCreators(optionActions.addDefaultOption, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
