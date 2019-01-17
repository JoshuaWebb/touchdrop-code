import { connect } from 'react-redux';

import App from '../App';
import { moveObjects, highlightDude } from '../actions/index';

const mapStateToProps = state => ({
  pos: state.pos,
  dude: state.dude,
});

const mapDispatchToProps = dispatch => ({
  moveObjects: (param) => {
    dispatch(moveObjects(param));
  },
  highlightDude: (param) => {
    dispatch(highlightDude(param));
  },
});

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Game;
