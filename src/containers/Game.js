import { connect } from 'react-redux';

import App from '../App';
import {
  moveObjects,
  highlightDude,
  cyclePieces,
  selectOrientation,
  nextPiece,
  placeBlock,
  checkPlaceability,
} from '../actions/index';

const mapStateToProps = state => ({
  pos: state.pos,
  dude: state.dude,
  currentPiece: state.currentPiece,
  orientation: state.orientation,
  field: state.field,
  blockCount: state.blockCount,
  placeable: state.placeable,
});

const mapDispatchToProps = dispatch => ({
  moveObjects: (param) => {
    dispatch(moveObjects(param));
  },
  highlightDude: (param) => {
    dispatch(highlightDude(param));
  },
  cyclePieces: (param) => {
    dispatch(cyclePieces(param));
  },
  selectOrientation: (param) => {
    dispatch(selectOrientation(param));
  },
  nextPiece: () => {
    dispatch(nextPiece());
  },
  placeBlock: (x, y, piece, orientation, field) => {
    dispatch(placeBlock(x, y, piece, orientation, field));
  },
  checkPlaceability: (x, y, piece, orientation, field) => {
    dispatch(checkPlaceability(x, y, piece, orientation, field));
  },
});

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Game;
