import {
  SET_ACTIVE_GRID_POSITION,
  CYCLE_PIECES,
  SELECT_ORIENTATION,
  NEXT_PIECE,
  PLACE_BLOCK,
  CHECK_PLACEABILITY,
  UPDATE_STATS,
  RESET,
  RESIZE,
} from '../actions';

import setActiveGridPosition from './setActiveGridPosition';
import cyclePieces from './cyclePieces';
import selectOrientation from './selectOrientation';
import nextPiece from './nextPiece';
import placeBlock from './placeBlock';
import checkPlaceability from './checkPlaceability';
import updateStats from './updateStats';
import resize from './resize';

// TODO: I think this is probably bad style to be in the component...
import { PIECE_NONE, ORIENTATION_NONE } from '../components/Piece';

import { fieldWidthInBlocks, fieldHeightInBlocks } from '../constants'

const initialState = {
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
  field: {
    blocks :
      Array(fieldHeightInBlocks).fill(0).map(r =>
        Array(fieldWidthInBlocks).fill(PIECE_NONE))
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
    case RESIZE:
      return resize(state, action);
    case RESET:
      // TODO: take some game options that
      // override the initial state?
      return initialState;
    default:
      return state;
  }
}

export default reducer;
