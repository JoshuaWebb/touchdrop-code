import { connect } from 'react-redux';

import _StyleConfiguration from '../components/StyleConfiguration';
import {
  setGameMode,
  updateConfig,
} from '../actions/index';

const mapStateToProps = state => ({
  config: state.config,
  gameMode: state.gameMode,
  lineTarget: state.lineTarget,
});

const mapDispatchToProps = dispatch => ({
  setGameMode: (newMode) => {
    dispatch(setGameMode(newMode));
  },
  updateConfig: (config) => {
    dispatch(updateConfig(config));
  },
});

export const StyleConfiguration = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_StyleConfiguration);
