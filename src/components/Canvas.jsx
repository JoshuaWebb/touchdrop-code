import React from 'react';

import Background from './Background';
import Field from './Field';
import Ball from './Ball';

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, -gameHeight, window.innerWidth, gameHeight];

  return (
    <svg
      id="game-canvas"
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      viewBox={viewBox}
    >
      <Background />
      <Field />
      <Ball pos={props.pos} />
    </svg>
  );
};

export default Canvas;
