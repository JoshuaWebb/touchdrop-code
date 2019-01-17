import React from 'react';

import Background from './Background';
import Field from './Field';
import Ball from './Ball';
import OrientationSelector from './OrientationSelector';

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, -gameHeight, window.innerWidth, gameHeight];

  const osSize = 70;
  const osMargin = 16;
  const allOsWidth = (osSize * 4 + osMargin * 3); 
  const osXStart = allOsWidth / -2.0;
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
        orientation={"left"}
        piece={props.currentPiece} />
      <OrientationSelector
        x={osXStart + osSize + osMargin} y={osYStart}
        width={osSize} height={osSize}
        orientation={"up"}
        piece={props.currentPiece} />
      <OrientationSelector
        x={osXStart + (osSize + osMargin)*2} y={osYStart}
        width={osSize} height={osSize}
        orientation={"right"}
        piece={props.currentPiece} />
      <OrientationSelector
        x={osXStart + (osSize + osMargin)*3} y={osYStart}
        width={osSize} height={osSize}
        orientation={"down"}
        piece={props.currentPiece} />



      <Ball pos={props.pos} />
    </svg>
  );
};

export default Canvas;
