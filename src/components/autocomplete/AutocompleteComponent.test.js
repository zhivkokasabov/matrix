import React from "react";
import AutocompleteComponent from "./AutocompleteComponent";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

it("will render options", () => {
  const onChange = jest.fn();
  const onSelectionChange = jest.fn();
  const onRemove = jest.fn();
  const options = [
    { id: 1, name: 'rihanna', historicalOption: false },
    { id: 2, name: 'beyonce', historicalOption: false },
  ];
  const searchValue = '';

  const component = shallow(
    <AutocompleteComponent
      onChange={onChange}
      onSelectionChange={onSelectionChange}
      onRemove={onRemove}
      options={options}
      searchValue={searchValue}
    />
  );

  component.find('.autocomplete').simulate('click');

  const uiOptions = component.find('.autocomplete__menu-item');

  expect(uiOptions.length).toEqual(2);
});

it("will set input value", () => {
  const onChange = jest.fn();
  const onSelectionChange = jest.fn();
  const onRemove = jest.fn();
  const options = [];
  const searchValue = 'something';

  const component = shallow(
    <AutocompleteComponent
      onChange={onChange}
      onSelectionChange={onSelectionChange}
      onRemove={onRemove}
      options={options}
      searchValue={searchValue}
    />
  );
  const value = component.find('input').props().value;

  expect(value).toEqual('something');
});

it("will close menu when click outside of it", () => {
  const onChange = jest.fn();
  const onSelectionChange = jest.fn();
  const onRemove = jest.fn();
  const options = [
    { id: 1, name: 'rihanna', historicalOption: false },
    { id: 2, name: 'beyonce', historicalOption: false },
  ];
  const searchValue = '';

  const component = shallow(
    <AutocompleteComponent
      onChange={onChange}
      onSelectionChange={onSelectionChange}
      onRemove={onRemove}
      options={options}
      searchValue={searchValue}
    />
  );

  component.find('.autocomplete').simulate('click');

  const uiOptions = component.find('.autocomplete__menu-item');

  component.find('.autocomplete').simulate('blur', { currentTarget: { contains: () => false } });

  const uiOptionsAfterClose = component.find('.autocomplete__menu-item');

  expect(uiOptions.length).toEqual(2);
  expect(uiOptionsAfterClose.length).toEqual(0);
});

describe('onKeyup', () => {
  it("call onSelectionChange on enter click", () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const onRemove = jest.fn();
    const options = [];
    const searchValue = 'something';

    const component = shallow(
      <AutocompleteComponent
        onChange={onChange}
        onSelectionChange={onSelectionChange}
        onRemove={onRemove}
        options={options}
        searchValue={searchValue}
      />
    );

    component.find('input').simulate('keyup', { keyCode: 13, target: { value: 'ala bala' } });

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledWith('ala bala');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it("close menu on enter click", () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const onRemove = jest.fn();
    const options = [
      { id: 1, name: 'rihanna', historicalOption: false },
      { id: 2, name: 'beyonce', historicalOption: false },
    ];
    const searchValue = 'something';

    const component = shallow(
      <AutocompleteComponent
        onChange={onChange}
        onSelectionChange={onSelectionChange}
        onRemove={onRemove}
        options={options}
        searchValue={searchValue}
      />
    );

    component.find('.autocomplete').simulate('click');

    const uiOptions = component.find('.autocomplete__menu-item');

    component.find('input').simulate('keyup', { keyCode: 13, target: { value: 'ala bala' } });

    const uiOptionsAfterClose = component.find('.autocomplete__menu-item');

    expect(uiOptions.length).toEqual(2);
    expect(uiOptionsAfterClose.length).toEqual(0);
  });

  it("call change if not enter click", () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const onRemove = jest.fn();
    const options = [];
    const searchValue = 'something';

    const component = shallow(
      <AutocompleteComponent
        onChange={onChange}
        onSelectionChange={onSelectionChange}
        onRemove={onRemove}
        options={options}
        searchValue={searchValue}
      />
    );

    component.find('input').simulate('keyup', { keyCode: 14, target: { value: 'ala bala' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('ala bala');
    expect(onSelectionChange).toHaveBeenCalledTimes(0);
  });
});

describe('onClick', () => {
  it("stop event propagation onClick", () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const onRemove = jest.fn();
    const options = [
      { id: 1, name: 'rihanna', historicalOption: false },
      { id: 2, name: 'beyonce', historicalOption: false },
    ];
    const searchValue = 'something';
    const stopPropagation = jest.fn();

    const component = shallow(
      <AutocompleteComponent
        onChange={onChange}
        onSelectionChange={onSelectionChange}
        onRemove={onRemove}
        options={options}
        searchValue={searchValue}
      />
    );

    component.find('.autocomplete').simulate('click');
    component.find('.autocomplete__menu-item button').first().simulate('click', { stopPropagation });

    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });

  it("should close menu", () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const onRemove = jest.fn();
    const options = [
      { id: 1, name: 'rihanna', historicalOption: false },
      { id: 2, name: 'beyonce', historicalOption: false },
    ];
    const searchValue = 'something';
    const stopPropagation = jest.fn();

    const component = shallow(
      <AutocompleteComponent
        onChange={onChange}
        onSelectionChange={onSelectionChange}
        onRemove={onRemove}
        options={options}
        searchValue={searchValue}
      />
    );

    component.find('.autocomplete').simulate('click');

    const uiOptions = component.find('.autocomplete__menu-item');

    component.find('.autocomplete__menu-item button').first().simulate('click', { stopPropagation });

    const uiOptionsAfterClose = component.find('.autocomplete__menu-item');

    expect(uiOptions.length).toEqual(2);
    expect(uiOptionsAfterClose.length).toEqual(0);
  });

  it("should call onSelectionChange", () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const onRemove = jest.fn();
    const options = [
      { id: 1, name: 'rihanna', historicalOption: false },
      { id: 2, name: 'beyonce', historicalOption: false },
    ];
    const searchValue = 'something';
    const stopPropagation = jest.fn();

    const component = shallow(
      <AutocompleteComponent
        onChange={onChange}
        onSelectionChange={onSelectionChange}
        onRemove={onRemove}
        options={options}
        searchValue={searchValue}
      />
    );

    component.find('.autocomplete').simulate('click');
    component.find('.autocomplete__menu-item button').first().simulate('click', { stopPropagation });

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledWith('rihanna');
  });
});

describe('onRemove', () => {
  it("stop event propagation onClick", () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const onRemove = jest.fn();
    const options = [
      { id: 1, name: 'rihanna', historicalOption: true },
      { id: 2, name: 'beyonce', historicalOption: true },
    ];
    const searchValue = 'something';
    const stopPropagation = jest.fn();

    const component = shallow(
      <AutocompleteComponent
        onChange={onChange}
        onSelectionChange={onSelectionChange}
        onRemove={onRemove}
        options={options}
        searchValue={searchValue}
      />
    );

    component.find('.autocomplete').simulate('click');
    component.find('.autocomplete__menu-item .autocomplete--remove').first().simulate('click', { stopPropagation });

    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });

  it("call onRemove", () => {
    const onChange = jest.fn();
    const onSelectionChange = jest.fn();
    const onRemove = jest.fn();
    const options = [
      { id: 1, name: 'rihanna', historicalOption: true },
      { id: 2, name: 'beyonce', historicalOption: true },
    ];
    const searchValue = 'something';
    const stopPropagation = jest.fn();

    const component = shallow(
      <AutocompleteComponent
        onChange={onChange}
        onSelectionChange={onSelectionChange}
        onRemove={onRemove}
        options={options}
        searchValue={searchValue}
      />
    );

    component.find('.autocomplete').simulate('click');
    component.find('.autocomplete__menu-item .autocomplete--remove').first().simulate('click', { stopPropagation });

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(options[0]);
  });
});
