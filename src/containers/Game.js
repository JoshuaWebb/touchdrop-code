import { connect } from 'react-redux';

import App from '../App';
import { moveObjects } from '../actions/index';

const mapStateToProps = state => ({
  pos: state.pos,
});

const mapDispatchToProps = dispatch => ({
  moveObjects: (param) => {
    dispatch(moveObjects(param));
  },
});

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Game;
