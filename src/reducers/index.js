import { MOVE_OBJECTS, HIGHLIGHT_DUDE, CYCLE_PIECES,
         SELECT_ORIENTATION, NEXT_PIECE } from '../actions';
import moveObjects from './moveObjects';
import highlightDude from './highlightDude';
import cyclePieces from './cyclePieces';
import selectOrientation from './selectOrientation';
import nextPiece from './nextPiece';

// TODO: I think this is probably bad style to be in the component...
import { PIECE_NONE } from '../components/Piece';

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
    default:
      return state;
  }
}

export default reducer;
