import React from 'react';

import {
  StyleConfiguration,
  MainMenu,
} from '../../containers/Menu';

import {
  MENU_MAIN,
  MENU_STYLE_SETTINGS,
} from '../../constants';

const MenuScreen = (props) => {
  switch (props.menu) {
    case MENU_STYLE_SETTINGS: return (<StyleConfiguration />);

    case MENU_MAIN: // through
    default: return (<MainMenu start={props.start} />);
  }
};

export default MenuScreen;
