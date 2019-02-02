import React from 'react';

import './EndScreen.css';
import Menu from './Menu/Menu';

import { millisecondsToTimestamp } from '../util';

const EndScreen = (props) => {
  const {
    gameMode,
    linesCleared,
    blockCount,
    reset,
    mainMenu,
    timerMillis,
  } = props;

  const endScreenMenuItems = [
    {
      text: "NEW GAME",
      onClick: reset,
    },
    {
      text: "MAIN MENU",
      onClick: mainMenu,
    },
  ];

  const statistics = [
    {
      name: "Total Pieces",
      value: blockCount,
    },
    {
      name: "Total Lines",
      value: linesCleared,
    },
    {
      name: "Time",
      value: millisecondsToTimestamp(timerMillis),
    },
  ].map(stat => (
      <div className="row" key={stat.name}>
        <span className="name">{stat.name}: </span>
        <span className="value">{stat.value}</span>
      </div>
    )
  );

  return (
    <div className="end-screen">
      <div>
        <h1 className="mode-name">{gameMode}</h1>
        <h1>FINISH</h1>
      </div>
      <div className="statistics">
        {statistics}
      </div>
      <div>
        <Menu items={endScreenMenuItems} />
      </div>
    </div>
  );
};

export default EndScreen;
