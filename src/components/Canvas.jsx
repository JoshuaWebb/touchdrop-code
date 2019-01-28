import React from 'react';

import Field from './Field';
import Piece from './Piece';
import LineCount from './LineCount';
import Timer from './Timer';
import Button from './Button';
import OrientationSelector from './OrientationSelector';
import PreviewPiece from './PreviewPiece';

import {
  blockSizeInUnits,
  GAMEMODE_LINE_TARGET,
} from '../constants';

const Canvas = (props) => {
  const gameHeight = 1200;
  const viewBox = [window.innerWidth / -2, -gameHeight, window.innerWidth, gameHeight];

  const bagDisplay = props.previewSlots.map((ps, i) =>
    <PreviewPiece
      key={`pp${i}`}
      x={ps.x} y={ps.y}
      width={ps.width} height={ps.height}
      piece={props.nextPieces[i]}
    />
  );

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

  let gameModeHud;
  switch (props.gameMode) {
    case GAMEMODE_LINE_TARGET: {
      // TODO: calculate the position for this properly...
      const lineCountPositionX = fieldX + 85;
      const lineCountPositionY = fieldY - 10;
      const timerPositionX = fieldX + 140;
      gameModeHud = <React.Fragment>
        <LineCount
          x={lineCountPositionX}
          y={lineCountPositionY}
          linesCleared={props.linesCleared}
          target={props.lineTarget}
        />
        <Timer
          x={timerPositionX}
          y={lineCountPositionY}
          timerMillis={props.timerMillis}
        />
      </React.Fragment>
    } break;
    default: gameModeHud = null;
  }

  const pieceX = fieldX + props.activePosition.col * blockSizeInUnits;
  const pieceY = fieldY + props.activePosition.row * blockSizeInUnits;

  const activePiece = (props.activePosition.row !== -1
    ? <Piece
        x={pieceX}
        y={pieceY}
        piece={props.currentPiece}
        orientation={props.orientation}
        placeable={props.placeable}
        blockSize={blockSizeInUnits} />
    : null);

  return (
    <svg
      id="game-canvas"
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      textRendering="optimizeLegibility"
      style={ {
        touchAction: 'none',
        width: props.windowWidth,
        height: props.windowHeight,
      } }
      onTouchStart={props.touchStart}
      onTouchMove={props.touchMove}
      onTouchEnd={props.touchEnd}
      onMouseDown={props.mouseDown}
      onMouseMove={props.mouseMove}
      onMouseUp={props.mouseUp}
      viewBox={viewBox}
    >
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
      {bagDisplay}
      {gameModeHud}
      <Button
        // TODO: calculate the position for this properly...
        x={fieldX + fieldWidth + 8} y={fieldY + 8}
        width={58}
        height={32}
        text="RESET"
        color="#ec3636"
        pressedColor="#dc2626"
        onPressed={props.reset}
      />
      <Button
        // TODO: calculate the position for this properly...
        x={fieldX + fieldWidth + 8} y={fieldY + 8 + 32 + 8}
        width={58}
        height={32}
        text="MENU"
        color="#3e3e3e"
        pressedColor="#292929"
        onPressed={props.mainMenu}
      />
    </svg>
  );
};

export default Canvas;
