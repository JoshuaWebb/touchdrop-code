function updateStats(state, action) {
  if (state.linesCleared === action.linesCleared) {
    return state;
  }

  return {
    ...state,
    linesCleared: action.linesCleared,
  };
}

export default updateStats;
