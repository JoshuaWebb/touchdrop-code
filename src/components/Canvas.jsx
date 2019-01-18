import React from 'react';

import Background from './Background';
import Field from './Field';
import Ball from './Ball';
import OrientationSelector from './OrientationSelector';

import { ORIENTATION_UP, ORIENTATION_RIGHT, ORIENTATION_DOWN, ORIENTATION_LEFT }
  from './Piece'

const orientations = [
  ORIENTATION_LEFT,
  ORIENTATION_UP,
  ORIENTATION_RIGHT,
  ORIENTATION_DOWN
];

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, -gameHeight, window.innerWidth, gameHeight];

  // TODO: move to a collection component?
  const osSize = 70;
  const osMargin = 16;
  const allOsWidth = (osSize * orientations.length + osMargin * (orientations.length - 1));
  const osXStart = allOsWidth / -2;
  const osYStart = -100 + osMargin;

  const orientationSelectors = orientations.map((orientation, i) =>
    <OrientationSelector
      key={`ori${i}`}
      x={osXStart + (osSize + osMargin)*i} y={osYStart}
      width={osSize} height={osSize}
      orientation={orientation}
      piece={props.currentPiece}
      selectOrientation={props.selectOrientation} />
  );

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
      {orientationSelectors}
      <Ball pos={props.pos} />
    </svg>
  );
};

export default Canvas;
