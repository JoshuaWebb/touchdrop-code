function setActiveGridPosition(state, action) {
  if (state.activePosition.row === action.activePosition.row &&
      state.activePosition.col === action.activePosition.col) {
    return state;
  }

  return {
    ...state,
    activePosition: {
        ...action.activePosition
    },
  };
}

export default setActiveGridPosition;
