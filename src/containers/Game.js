import { connect } from 'react-redux';

import App from '../App';
import {
  moveObjects, highlightDude, cyclePieces,
  selectOrientation, nextPiece,
} from '../actions/index';

const mapStateToProps = state => ({
  pos: state.pos,
  dude: state.dude,
  currentPiece: state.currentPiece,
  orientation: state.orientation,
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
});

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Game;
