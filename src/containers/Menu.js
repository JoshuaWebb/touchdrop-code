import { connect } from 'react-redux';

import _MainMenu from '../components/Menu/MainMenu';
import _StyleConfiguration from '../components/Menu/StyleConfiguration';

import {
  setMenu,
  setGameMode,
  updateConfig,
} from '../actions/index';

const mapStateToProps = state => ({
  config: state.config,
  menu: state.menu,
  gameMode: state.gameMode,
  lineTarget: state.lineTarget,
});

const mapDispatchToProps = dispatch => ({
  setMenu: (menu) => {
    dispatch(setMenu(menu));
  },
  setGameMode: (newMode) => {
    dispatch(setGameMode(newMode));
  },
  updateConfig: (config) => {
    dispatch(updateConfig(config));
  },
});

const connectFn = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const MainMenu = connectFn(_MainMenu);
export const StyleConfiguration = connectFn(_StyleConfiguration);
