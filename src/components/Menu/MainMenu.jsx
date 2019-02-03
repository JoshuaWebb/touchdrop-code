import React from 'react';

import Menu from './Menu';

import {
  GAMEMODE_ZEN,
  GAMEMODE_LINE_TARGET,
  MENU_STYLE_SETTINGS,
  MENU_IMPORT_EXPORT,
} from '../../constants';

const MainMenu = (props) => {
  const menuItems = [
    {
      text: 'ZEN MODE',
      onClick: () => {
        props.setGameMode(GAMEMODE_ZEN);
        props.start();
      },
    },
    {
      text: 'LINE TARGET MODE',
      onClick: () => {
        props.setGameMode(GAMEMODE_LINE_TARGET);
        // TODO: we probably want a settings screen
        // for a bunch of the different modes, rather
        // than starting the game immediately.
        props.start();
      },
    },
    {
      text: 'CUSTOMIZE STYLE',
      onClick: () => {
        props.setMenu(MENU_STYLE_SETTINGS);
      },
    },
    {
      text: 'IMPORT / EXPORT SETTINGS',
      onClick: () => {
        props.setMenu(MENU_IMPORT_EXPORT);
      },
    },
  ];

  return (
    <Menu items={menuItems} />
  );
};

export default MainMenu;
