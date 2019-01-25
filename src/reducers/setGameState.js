import {
  GAMESTATE_PLAYING, GAMESTATE_PAUSED,
} from '../constants';

export default (state, action) => {
  let newState = action.gameState;
  if (action.gameState === GAMESTATE_PAUSED) {
    if (state.gameState === GAMESTATE_PAUSED) {
      newState = GAMESTATE_PLAYING;
    }
  }

  return {
    ...state,
    gameState: newState,
  };
};
