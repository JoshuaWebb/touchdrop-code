import React from 'react';

import Block from './Block';

export const PIECE_NONE = -1;
export const PIECE_I = 0;
export const PIECE_L = 1;
export const PIECE_O = 2;
export const PIECE_Z = 3;
export const PIECE_T = 4;
export const PIECE_J = 5;
export const PIECE_S = 6;

export const ORIENTATION_NONE  = -1;
export const ORIENTATION_UP    = 0;
export const ORIENTATION_RIGHT = 1;
export const ORIENTATION_DOWN  = 2;
export const ORIENTATION_LEFT  = 3;

const allPieceDataX = [
  [[0,1,2,3],[2,2,2,2],[3,2,1,0],[1,1,1,1]],  // I
  [[2,2,1,0],[2,1,1,1],[0,0,1,2],[0,1,1,1]],  // L
  [[0,1,1,0],[1,1,0,0],[1,0,0,1],[0,0,1,1]],  // O
  [[0,1,1,2],[2,2,1,1],[2,1,1,0],[0,0,1,1]],  // Z
  [[1,0,1,2],[2,1,1,1],[1,2,1,0],[0,1,1,1]],  // T
  [[0,0,1,2],[2,1,1,1],[2,2,1,0],[0,1,1,1]],  // J
  [[2,1,1,0],[2,2,1,1],[0,1,1,2],[0,0,1,1]],  // S
];

const allPieceDataY = [
  [[1,1,1,1],[0,1,2,3],[2,2,2,2],[3,2,1,0]],  // I
  [[0,1,1,1],[2,2,1,0],[2,1,1,1],[0,0,1,2]],  // L
  [[0,0,1,1],[0,1,1,0],[1,1,0,0],[1,0,0,1]],  // O
  [[0,0,1,1],[0,1,1,2],[2,2,1,1],[2,1,1,0]],  // Z
  [[0,1,1,1],[1,0,1,2],[2,1,1,1],[1,2,1,0]],  // T
  [[0,1,1,1],[0,0,1,2],[2,1,1,1],[2,2,1,0]],  // J
  [[0,0,1,1],[2,1,1,0],[2,2,1,1],[0,1,1,2]],  // S
];

export const PIECE_COUNT = allPieceDataX.length;

export function placeBlock(x, y, piece, orientation, field) {
  const blocksX = allPieceDataX[piece][orientation];
  const blocksY = allPieceDataY[piece][orientation];

  const { xOffset, yOffset } = getGridOffset(x, y, piece, orientation);

  for (var i = 0; i < blocksX.length; i++) {
    const x2 = xOffset + blocksX[i];
    const y2 = yOffset + blocksY[i];

    const row = field.blocks[y2] || field.hiddenBlocks[y2 * -1 - 1];
    row[x2] = piece;
  }
}

export function checkPlaceability(x, y, piece, orientation, field) {
  if (piece !== PIECE_NONE &&
      orientation !== -1 &&
      x !== -1 &&
      y !== -1
  ) {
    // TODO: check if the piece has a valid path to get
    // to this position from the top.
    //
    // Idea: Instead of a consant reference point at the top,
    // ave a regular piece dropping slowly and move it
    // left/right as the player drags the destination left/right
    // if the regular piece becomes obstructed, the player can
    // no longer move it in that direction, and if the piece
    // lands in a lockable position before the player lets go
    // lock the piece. The dragging should assume optimal play
    // including valid spins/kicks.
    const collides = checkCollision(x, y, piece, orientation, field);
    const supported = !collides && checkCollision(x, y + 1, piece, orientation, field);
    return !collides && supported;
  }

  return false;
}

export function checkCollision(x, y, piece, orientation, field) {
  const blocksX = allPieceDataX[piece][orientation];
  const blocksY = allPieceDataY[piece][orientation];

  const fieldWidth = field.blocks[0].length;
  const fieldHeight = field.length;

  const { xOffset, yOffset } = getGridOffset(x, y, piece, orientation);

  for (var i = 0; i < blocksX.length; i++) {
    const x2 = xOffset + blocksX[i];
    const y2 = yOffset + blocksY[i];

    // Off the left edge of the field
    if (x2 < 0) {
      return true;
    }

    // Off the right / bottom edge of the field
    if (x2 >= fieldWidth || y2 >= fieldHeight) {
      return true;
    }

    const row = field.blocks[y2] || field.hiddenBlocks[y2 * -1 - 1];

    // Off the top edge (past the hidden blocks) of the field
    if (row === undefined) {
      return true;
    }

    // Collides with a previously placed block
    if (row[x2] !== PIECE_NONE) {
      return true;
    }
  }

  return false;
}

// TODO: don't create a new object just to return
// these values.
function getGridOffset(x, y, piece, orientation) {
  const height = getHeight(piece, orientation);

  const minX = getMinX(piece, orientation);
  const minY = getMinY(piece, orientation);

  const xOffset = x - minX;
  const yOffset = y - (minY + height - 1);

  return { xOffset, yOffset };
}

// TODO: cache these...
function getMinX(piece, orientation) {
  const blocks = allPieceDataX[piece][orientation];

  var min = blocks[0];

  for (var i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    min = min < block ? min : block;
  }

  return min;
}

function getMinY(piece, orientation) {
  const blocks = allPieceDataY[piece][orientation];

  var min = blocks[0];

  for (var i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    min = min < block ? min : block;
  }

  return min;
}

function getWidth (piece, orientation) {
  const blocks = allPieceDataX[piece][orientation];

  var min = blocks[0];
  var max = blocks[0];

  for (var i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    min = min < block ? min : block;
    max = max > block ? max : block;
  }

  return (max - min) + 1;
}

function getHeight (piece, orientation) {
  const blocks = allPieceDataY[piece][orientation];

  var min = blocks[0];
  var max = blocks[0];

  for (var i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    min = min < block ? min : block;
    max = max > block ? max : block;
  }

  return (max - min) + 1;
}

const Piece = (props) => {
  const {
    piece, orientation, blockSize, placeable,
    cx, cy, x, y,
    blockStyles,
  } = props;

  if (piece === PIECE_NONE || orientation === ORIENTATION_NONE)
    return null;

  const pieceDataX = allPieceDataX[piece][orientation];
  const pieceDataY = allPieceDataY[piece][orientation];

  const width = getWidth(piece, orientation);
  const height = getHeight(piece, orientation);

  const minX = getMinX(piece, orientation);
  const minY = getMinY(piece, orientation);

  var xOffset;
  var yOffset;
  if (cx !== undefined && cy !== undefined) {
    xOffset = (cx - minX * blockSize - (width  * blockSize / 2));
    yOffset = (cy - minY * blockSize - (height * blockSize / 2));
  } else {
    xOffset = x - minX * blockSize;
    yOffset = y - (minY + height - 1) * blockSize;
  }

  return (
    pieceDataX.map((x, i) => {
      const y = pieceDataY[i];
      return (
        <Block
          key={i}
          x={xOffset + x * blockSize}
          y={yOffset + y * blockSize}
          placeable={placeable}
          piece={piece}
          blockStyles={blockStyles}
          blockSize={blockSize} />
      );
    })
  );
};

export default Piece;
