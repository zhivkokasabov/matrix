import React, { useState, useEffect } from 'react';
import './AutocompleteComponent.scss';
import { FiSearch } from 'react-icons/fi';
import { BsClock } from 'react-icons/bs';

const AutocompleteComponent = ({
  onSelectionChange,
  onRemove,
  onChange,
  options,
  searchValue
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue])

  const show = () => {
    setOpen(true);
  }

  const hide = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  }

  const onKeyup = (event) => {
    if (event.keyCode === 13 && inputValue.length) {
      setOpen(false);
      onSelectionChange(event.target.value);
    } else {
      onChange(event.target.value);
    }
  }

  const onIputChange = (event) => {
    setInputValue(event.target.value);
  }

  const onClick = (event, option) => {
    event.stopPropagation();

    setOpen(false);
    onSelectionChange(option.name);
  }

  const onRemoveClick = (event, option) => {
    event.stopPropagation();

    onRemove(option);
  }

  return (
    <div onClick={show} onBlur={hide} className={`autocomplete ${ open ? 'open' : '' }`}>
      <div className="autocomplete__search">
        <FiSearch className={`autocomplete__icon ${ open ? '' : 'autocomplete--hidden' }`}></FiSearch>
        <input
          autoFocus
          onKeyUp={onKeyup}
          onChange={onIputChange}
          autoComplete="nope"
          value={inputValue}
          type="text"
          className="autocomplete__input"
        />
      </div>
      {
        open ?
          (<div className='autocomplete__menu'>
            <div className='autocomplete__divider'></div>
            {options.map(option => {
              return (
                <div className="autocomplete__menu-item" key={option.id}>
                  {
                    option.historicalOption ?
                      (<BsClock className="autocomplete__icon"></BsClock>) :
                      (<FiSearch className="autocomplete__icon"></FiSearch>)
                  }
                  <button className="autocomplete--search" onClick={(e) => { onClick(e, option) }}>{option.name}</button>
                  {
                    option.historicalOption ?
                      (<button className="autocomplete--remove" onClick={(e) => { onRemoveClick(e, option) }}>Remove</button>) : null
                  }
                </div>
              )
            })}
          </div>) : (null)
      }
    </div>
  );
};

export default AutocompleteComponent;
