import React from 'react';

import Background from './Background';
import Field from './Field';
import Ball from './Ball';
import Piece from './Piece';
import OrientationSelector from './OrientationSelector';

import { blockSizeInUnits } from '../constants';

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
      selected={props.orientation === orientation}
      selectOrientation={props.selectOrientation} />
  );

  // TODO: centralise these :FieldPlacement
  const fieldX = -130;
  const fieldY = -620;

  const pieceX = fieldX + props.dude.col * blockSizeInUnits;
  const pieceY = fieldY + props.dude.row * blockSizeInUnits;

  const activePiece = props.dude.row !== -1
    ? <Piece
        x={pieceX}
        y={pieceY}
        piece={props.currentPiece}
        orientation={props.orientation}
        blockSize={blockSizeInUnits} />
    : null;

  return (
    <svg
      id="game-canvas"
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      style={ {touchAction: 'none'} }
      onTouchStart={props.touchStart}
      onTouchMove={props.touchMove}
      onTouchEnd={props.touchEnd}
      viewBox={viewBox}
    >
      <Background />
      <Field dude={props.dude}
             click={props.click} />
      {activePiece}
      {orientationSelectors}
      <Ball pos={props.pos} />
    </svg>
  );
};

export default Canvas;
