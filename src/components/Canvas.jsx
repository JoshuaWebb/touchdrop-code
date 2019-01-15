import React from 'react';

import Background from './Background';
import Ball from './Ball';

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, -gameHeight, window.innerWidth, gameHeight];

  return (
    <svg
      id="game-canvas"
      viewBox={viewBox}
    >
      <Background />
      <Ball pos={props.pos} />
    </svg>
  );
};

export default Canvas;
