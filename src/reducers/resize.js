function resize(state, action) {
  return {
    ...state,
    windowWidth: action.newWidth,
    windowHeight: action.newHeight,
  }
}

export default resize;

