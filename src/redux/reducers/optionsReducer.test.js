import optionsReducer from "./optionsReducer";
import * as actions from "../actions/optionActions";

it("should return options when passed GET_OPTIONS_SUCCESS", () => {
  const initialState = [
    { id: 1, name: 'rihanna', historicalOption: false },
    { id: 2, name: 'beyonce', historicalOption: false }
  ];

  const action = actions.getOptions('rihanna');

  const newState = optionsReducer(initialState, action);

  expect(newState.length).toEqual(2);
  expect(newState[0].name).toEqual('rihanna');
  expect(newState[1].name).toEqual('beyonce');
});
