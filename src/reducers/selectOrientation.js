function selectOrientation(state, action) {
  if (state.orientation === action.orientation) {
    return state;
  }

  return {
    ...state,
    orientation: action.orientation,
  };
}

export default selectOrientation;
