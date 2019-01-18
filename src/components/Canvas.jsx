import React from 'react';

import Background from './Background';
import Field from './Field';
import Ball from './Ball';
import OrientationSelector from './OrientationSelector';

import { ORIENTATION_UP, ORIENTATION_RIGHT, ORIENTATION_DOWN, ORIENTATION_LEFT }
  from './Piece'

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, -gameHeight, window.innerWidth, gameHeight];

  const osSize = 70;
  const osMargin = 16;
  const allOsWidth = (osSize * 4 + osMargin * 3); 
  const osXStart = allOsWidth / -2;
  const osYStart = -100 + osMargin;

  return (
    <svg
      id="game-canvas"
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      viewBox={viewBox}
    >
      <Background />
      <Field dude={props.dude}
             click={props.click} />
      <OrientationSelector
        x={osXStart} y={osYStart}
        width={osSize} height={osSize}
        orientation={ORIENTATION_LEFT}
        piece={props.currentPiece} />
      <OrientationSelector
        x={osXStart + osSize + osMargin} y={osYStart}
        width={osSize} height={osSize}
        orientation={ORIENTATION_UP}
        piece={props.currentPiece} />
      <OrientationSelector
        x={osXStart + (osSize + osMargin)*2} y={osYStart}
        width={osSize} height={osSize}
        orientation={ORIENTATION_RIGHT}
        piece={props.currentPiece} />
      <OrientationSelector
        x={osXStart + (osSize + osMargin)*3} y={osYStart}
        width={osSize} height={osSize}
        orientation={ORIENTATION_DOWN}
        piece={props.currentPiece} />



      <Ball pos={props.pos} />
    </svg>
  );
};

export default Canvas;
