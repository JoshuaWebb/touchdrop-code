function nextPiece(state, action) {
  return {
    ...state,
    currentPiece: action.nextPiece,
    // Note: We require this to be a "new" array, but I don't want
    // to create a copy of a copy here.
    nextPieces: action.nextPieces,
  };
}

export default nextPiece;
