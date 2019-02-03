import React from 'react';

import {
  StyleConfiguration,
  MainMenu,
  ImportExportSettings,
} from '../../containers/Menu';

import {
  MENU_MAIN,
  MENU_STYLE_SETTINGS,
  MENU_IMPORT_EXPORT,
} from '../../constants';

const MenuScreen = (props) => {
  switch (props.menu) {
    case MENU_STYLE_SETTINGS: return (<StyleConfiguration />);
    case MENU_IMPORT_EXPORT: return (<ImportExportSettings />);

    case MENU_MAIN: // through
    default: return (<MainMenu start={props.start} />);
  }
};

export default MenuScreen;
