function highlightDude(state, action) {
  return {
    ...state,
    dude: {
        ...action.dude
    },
  };
}

export default highlightDude;
