import React from 'react';

import Background from './Background';
import Field from './Field';
import Piece from './Piece';
import OrientationSelector from './OrientationSelector';

import { blockSizeInUnits } from '../constants';

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, -gameHeight, window.innerWidth, gameHeight];

  const orientationSelectors = props.orientationSelectors.map((os, i) =>
    <OrientationSelector
      key={`ori${i}`}
      x={os.x} y={os.y}
      width={os.width} height={os.height}
      orientation={os.orientation}
      piece={props.currentPiece}
      selected={props.orientation === os.orientation}
    />
  );

  const {
    x: fieldX, y: fieldY,
    width: fieldWidth, height: fieldHeight,
    rows: fieldRows, cols: fieldCols,
    blockSize,
  } = props.fieldDimensions;

  const pieceX = fieldX + props.activePosition.col * blockSizeInUnits;
  const pieceY = fieldY + props.activePosition.row * blockSizeInUnits;

  const activePiece = props.activePosition.row !== -1
    ? <Piece
        x={pieceX}
        y={pieceY}
        piece={props.currentPiece}
        orientation={props.orientation}
        placeable={props.placeable}
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
      onMouseDown={props.mouseDown}
      onMouseMove={props.mouseMove}
      onMouseUp={props.mouseUp}
      viewBox={viewBox}
    >
      <Background />
      <Field
        activePosition={props.activePosition}
        x={fieldX}
        y={fieldY}
        width={fieldWidth}
        height={fieldHeight}
        blockSize={blockSize}
        rows={fieldRows}
        cols={fieldCols}
        blocks={props.blocks}
        blockCount={props.blockCount} />
      {activePiece}
      {orientationSelectors}
    </svg>
  );
};

export default Canvas;
