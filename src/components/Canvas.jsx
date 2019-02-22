import React, { Component } from 'react';

import Field from './Field';
import Piece from './Piece';
import LineCount from './LineCount';
import Timer from './Timer';
import ReadyGo from './ReadyGo';
import Button from './Button';
import OrientationSelector from './OrientationSelector';
import PreviewPiece from './PreviewPiece';

import {
  blockSizeInUnits,
  GAMEMODE_LINE_TARGET,
  passiveSupported,
  totalReadyMillis,
} from '../constants';

class Canvas extends Component {
  preventDefault = (e) => e.preventDefault();

  componentDidMount() {
    // We need this for iOS to prevent "overscroll" and
    // "pull down to refresh"
    window.addEventListener('touchmove', this.preventDefault,
      passiveSupported ? { passive: false } : false
    );
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.preventDefault);
  }

  render() {
  const gameHeight = 680;
  const viewBox = [window.innerWidth / -2, -gameHeight, window.innerWidth, gameHeight];
  const props = this.props;

  const {
    config: {
      blockStyles
    },
    readyMillis,
    readyAnimationIndex,
  } = props;

  const bagDisplay = props.previewSlots.map((ps, i) =>
    <PreviewPiece
      key={`pp${i}`}
      x={ps.x} y={ps.y}
      width={ps.width} height={ps.height}
      piece={props.nextPieces[i]}
      blockStyles={blockStyles}
    />
  );

  const orientationSelectors = props.orientationSelectors.map((os, i) =>
    <OrientationSelector
      key={`ori${i}`}
      x={os.x} y={os.y}
      width={os.width} height={os.height}
      orientation={os.orientation}
      piece={props.currentPiece}
      blockStyles={blockStyles}
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
        blockStyles={blockStyles}
        blockSize={blockSizeInUnits} />
    : null);

  const fieldClipId = "field-clip";
  return (
    <svg
      id="game-canvas"
      preserveAspectRatio="xMidYMax meet"
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
      <defs>
        <clipPath id={fieldClipId} >
          <rect
            x={fieldX}
            y={fieldY}
            width={fieldWidth}
            height={fieldHeight} />
        </clipPath>
      </defs>
      <Field
        activePosition={props.activePosition}
        x={fieldX}
        y={fieldY}
        width={fieldWidth}
        height={fieldHeight}
        blockSize={blockSize}
        blockStyles={blockStyles}
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
      <ReadyGo
        totalReadyMillis={totalReadyMillis}
        remainingMillis={readyMillis}
        animationIndex={readyAnimationIndex}
        maskId={fieldClipId}
        x={fieldX + fieldWidth/2}
        y={fieldY + fieldHeight/2}
      />
    </svg>
  );
}
}

export default Canvas;
