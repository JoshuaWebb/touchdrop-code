function highlightDude(state, action) {
  if (action.dude.row === -1) {
    return state;
  }

  return {
    ...state,
    dude: action.dude,
  };
}

export default highlightDude;
