export default (state, action) => {
  if (state.readyMillis === action.readyMillis) {
    return state;
  }

  return {
    ...state,
    readyMillis: action.readyMillis,
  };
};
