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

    field[y2][x2] = piece;
  }
}

export function checkCollision(x, y, piece, orientation, field) {
  const blocksX = allPieceDataX[piece][orientation];
  const blocksY = allPieceDataY[piece][orientation];

  const fieldWidth = field[0].length;
  const fieldHeight = field.length;

  const { xOffset, yOffset } = getGridOffset(x, y, piece, orientation);

  for (var i = 0; i < blocksX.length; i++) {
    const x2 = xOffset + blocksX[i];
    const y2 = yOffset + blocksY[i];

    if (x2 < 0) {
      return true;
    }

    if (x2 >= fieldWidth || y2 >= fieldHeight) {
      return true;
    }

    const row = field[y2];
    if (row === undefined) {
      continue;
    }

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
  const { piece, orientation, blockSize, cx, cy, x, y, placeable } = props;

  if (piece === -1 || orientation === -1)
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
          blockSize={blockSize} />
      );
    })
  );
};

export default Piece;
