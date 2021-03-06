import { connect } from 'react-redux';

import App from '../App';
import {
  setActiveGridPosition,
  cyclePieces,
  selectOrientation,
  nextPiece,
  placeBlock,
  updateStats,
  checkPlaceability,
  reset,
  resize,
  setGameState,
  setGameMode,
  updateReady,
  updateTimer,
  loadConfig,
} from '../actions/index';

const mapStateToProps = state => ({
  menu: state.menu,
  config: state.config,
  gameState: state.gameState,
  gameMode: state.gameMode,
  activePosition: state.activePosition,
  currentPiece: state.currentPiece,
  nextPieces: state.nextPieces,
  previewLength: state.previewLength,
  orientation: state.orientation,
  field: state.field,
  blockCount: state.blockCount,
  placeable: state.placeable,
  linesCleared: state.linesCleared,
  lineTarget: state.lineTarget,
  windowWidth: state.windowWidth,
  windowHeight: state.windowHeight,
  timerMillis: state.timerMillis,
  readyMillis: state.readyMillis,
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
  placeBlock: (field) => {
    dispatch(placeBlock(field));
  },
  checkPlaceability: (x, y, piece, orientation, field) => {
    dispatch(checkPlaceability(x, y, piece, orientation, field));
  },
  updateStats: (linesCleared) => {
    dispatch(updateStats(linesCleared));
  },
  reset: () => {
    dispatch(reset());
  },
  resize: (newWidth, newHeight) => {
    dispatch(resize(newWidth, newHeight));
  },
  setGameState: (newGameState) => {
    dispatch(setGameState(newGameState));
  },
  setGameMode: (newMode) => {
    dispatch(setGameMode(newMode));
  },
  updateReady: (readyMillis) => {
    dispatch(updateReady(readyMillis));
  },
  updateTimer: (timerMillis) => {
    dispatch(updateTimer(timerMillis));
  },
  loadConfig: () => {
    dispatch(loadConfig());
  },
});

const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Game;
