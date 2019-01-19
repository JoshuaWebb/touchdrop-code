function highlightDude(state, action) {
  if (state.dude.row === action.dude.row &&
      state.dude.col === action.dude.col) {
    return state;
  }

  return {
    ...state,
    dude: {
        ...action.dude
    },
  };
}

export default highlightDude;
