function cyclePieces(state, action) {
  if (!action.next && !action.prev) {
    return state;
  }

  var currentPiece;
  if (action.next) {
    currentPiece = state.currentPiece + 1;
  } else if (action.prev) {
    currentPiece = state.currentPiece - 1;
  }

  // Wrap around with -1 in the middle (no piece)
  if (currentPiece > 6) {
    currentPiece = -1;
  } else if (currentPiece < -1) {
    currentPiece = 6;
  }

  return {
    ...state,
    currentPiece: currentPiece,
  };
}

// replace with a dummy function in prod builds
// so we don't have to worry about "leaving" it
// in somehow.
const exportFn = ((process.env.NODE_ENV === 'production')
  ? (function() {})
  : cyclePieces);

export default exportFn;
