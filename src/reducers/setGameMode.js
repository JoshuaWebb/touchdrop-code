export default (state, action) => {
  return {
    ...state,
    gameMode: action.gameMode,
  };
};
