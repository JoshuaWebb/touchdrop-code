import React from 'react';

import './EndScreen.css';
import Menu from './Menu';

const EndScreen = (props) => {
  const {
    gameMode,
    linesCleared,
    blockCount,
    reset,
    mainMenu,
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
      value: "TODO", // TODO
    },
  ].map(stat => (
      <div class="row" key={stat.name}>
        <span class="name">{stat.name}: </span>
        <span class="value">{stat.value}</span>
      </div>
    )
  );

  return (
    <div className="end-screen">
      <div>
        <h1 class="mode-name">{gameMode}</h1>
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
