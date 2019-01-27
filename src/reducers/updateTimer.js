export default (state, action) => {
  if (state.timerMillis === action.timerMillis) {
    return state;
  }

  return {
    ...state,
    timerMillis: action.timerMillis,
  };
};
