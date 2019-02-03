import {
  SET_ACTIVE_GRID_POSITION,
  CYCLE_PIECES,
  SELECT_ORIENTATION,
  NEXT_PIECE,
  PLACE_BLOCK,
  CHECK_PLACEABILITY,
  UPDATE_STATS,
  UPDATE_TIMER,
  UPDATE_CONFIG,
  LOAD_CONFIG,
  RESET,
  RESIZE,
  SET_GAME_STATE,
  SET_GAME_MODE,
  SET_MENU,
} from '../actions';

import setActiveGridPosition from './setActiveGridPosition';
import cyclePieces from './cyclePieces';
import selectOrientation from './selectOrientation';
import nextPiece from './nextPiece';
import placeBlock from './placeBlock';
import checkPlaceability from './checkPlaceability';
import updateStats from './updateStats';
import updateTimer from './updateTimer';
import { loadConfig, updateConfig } from './config';
import resize from './resize';
import setGameState from './setGameState';
import setGameMode from './setGameMode';
import setMenu from './setMenu';

// TODO: I think this is probably bad style to be in the component...
import { PIECE_NONE, ORIENTATION_NONE } from '../components/Piece';

import {
  fieldWidthInBlocks, fieldHeightInBlocks,
  GAMESTATE_MENU, GAMESTATE_PLAYING,
  defaultStyles,
} from '../constants'

const initialState = {
  gameState: GAMESTATE_MENU,
  activePosition: {
    row: -1,
    col: -1,
  },
  currentPiece: PIECE_NONE,
  previewLength: 5,
  nextPieces: [],
  orientation: ORIENTATION_NONE,
  placeable: false,
  blockCount: 0,
  linesCleared: 0,
  lineTarget: 40,
  timerMillis: 0,
  field: {
    blocks :
      Array(fieldHeightInBlocks).fill(0).map(r =>
        Array(fieldWidthInBlocks).fill(PIECE_NONE))
  },
  config: {
    version: 0,
    blockStyles: defaultStyles,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_GRID_POSITION:
      return setActiveGridPosition(state, action);
    case CYCLE_PIECES:
      return cyclePieces(state, action);
    case SELECT_ORIENTATION:
      return selectOrientation(state, action);
    case NEXT_PIECE:
      return nextPiece(state, action);
    case PLACE_BLOCK:
      return placeBlock(state, action);
    case CHECK_PLACEABILITY:
      return checkPlaceability(state, action);
    case UPDATE_STATS:
      return updateStats(state, action);
    case UPDATE_TIMER:
      return updateTimer(state, action);
    case UPDATE_CONFIG:
      return updateConfig(state, action);
    case LOAD_CONFIG:
      return loadConfig(state);
    case RESIZE:
      return resize(state, action);
    case SET_GAME_STATE:
      return setGameState(state, action);
    case SET_GAME_MODE:
      return setGameMode(state, action);
    case SET_MENU:
      return setMenu(state, action);
    case RESET:
      // TODO: take some game options that
      // override the initial state?
      return {
        ...initialState,
        config: state.config,
        windowWidth: state.windowWidth,
        windowHeight: state.windowHeight,
        gameMode: state.gameMode,
        gameState: GAMESTATE_PLAYING,
      };
    default:
      return state;
  }
}

export default reducer;
