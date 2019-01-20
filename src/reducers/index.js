import {
  MOVE_OBJECTS,
  HIGHLIGHT_DUDE,
  CYCLE_PIECES,
  SELECT_ORIENTATION,
  NEXT_PIECE,
  PLACE_BLOCK,
  CHECK_PLACEABILITY,
} from '../actions';

import moveObjects from './moveObjects';
import highlightDude from './highlightDude';
import cyclePieces from './cyclePieces';
import selectOrientation from './selectOrientation';
import nextPiece from './nextPiece';
import placeBlock from './placeBlock';
import checkPlaceability from './checkPlaceability';

// TODO: I think this is probably bad style to be in the component...
import { PIECE_NONE } from '../components/Piece';

import { fieldWidthInBlocks, fieldHeightInBlocks } from '../constants'

const initialState = {
  pos: {
    x:  400,
    y: -100,
  },
  dude: {
    row: -1,
    col: -1,
  },
  currentPiece: PIECE_NONE,
  orientation: -1,
  placeable: false,
  blockCount: 0,
  blocks: Array(fieldHeightInBlocks).fill(0).map(r =>
            Array(fieldWidthInBlocks).fill(PIECE_NONE)),
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_OBJECTS:
      return moveObjects(state, action);
    case HIGHLIGHT_DUDE:
      return highlightDude(state, action);
    case CYCLE_PIECES:
      return cyclePieces(state, action);
    case SELECT_ORIENTATION:
      return selectOrientation(state, action);
    case NEXT_PIECE:
      return nextPiece(state);
    case PLACE_BLOCK:
      return placeBlock(state, action);
    case CHECK_PLACEABILITY:
      return checkPlaceability(state, action);
    default:
      return state;
  }
}

export default reducer;
