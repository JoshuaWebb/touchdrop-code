import { connect } from 'react-redux';

import App from '../App';
import {
  setActiveGridPosition,
  cyclePieces,
  selectOrientation,
  nextPiece,
  placeBlock,
  checkPlaceability,
} from '../actions/index';

const mapStateToProps = state => ({
  activePosition: state.activePosition,
  currentPiece: state.currentPiece,
  nextPieces: state.nextPieces,
  previewLength: state.previewLength,
  orientation: state.orientation,
  field: state.field,
  blockCount: state.blockCount,
  placeable: state.placeable,
});

const mapDispatchToProps = dispatch => ({
  setActiveGridPosition: (param) => {
    dispatch(setActiveGridPosition(param));
  },
  cyclePieces: (param) => {
    dispatch(cyclePieces(param));
  },
  selectOrientation: (param) => {
    dispatch(selectOrientation(param));
  },
  nextPiece: (np, nps) => {
    dispatch(nextPiece(np, nps));
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
