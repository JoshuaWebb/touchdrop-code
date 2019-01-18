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

// TODO: cache these...
function getMinX(piece, orientation) {
  const blocks = allPieceDataX[piece][orientation];

  var min = blocks[0];

  for (var i = 1; i < 4; i++) {
    const block = blocks[i];
    min = min < block ? min : block;
  }

  return min;
}

function getMinY(piece, orientation) {
  const blocks = allPieceDataY[piece][orientation];

  var min = blocks[0];

  for (var i = 1; i < 4; i++) {
    const block = blocks[i];
    min = min < block ? min : block;
  }

  return min;
}

function getWidth (piece, orientation) {
  const blocks = allPieceDataX[piece][orientation];

  var min = blocks[0];
  var max = blocks[0];

  for (var i = 1; i < 4; i++) {
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

  for (var i = 1; i < 4; i++) {
    const block = blocks[i];
    min = min < block ? min : block;
    max = max > block ? max : block;
  }

  return (max - min) + 1;
}

const Piece = (props) => {
  const { piece, orientation, blockSize, cx, cy } = props;

  if (piece === -1)
    return null;

  const pieceDataX = allPieceDataX[piece][orientation];
  const pieceDataY = allPieceDataY[piece][orientation];

  const width = getWidth(piece, orientation);
  const height = getHeight(piece, orientation);

  const minX = getMinX(piece, orientation);
  const minY = getMinY(piece, orientation);

  const xOffset = (cx - minX * blockSize - (width  * blockSize / 2));
  const yOffset = (cy - minY * blockSize - (height * blockSize / 2));

  return (
    pieceDataX.map((x, i) => {
      const y = pieceDataY[i];
      return (
        <Block
          key={i}
          x={xOffset + x * blockSize}
          y={yOffset + y * blockSize}
          piece={piece}
          blockSize={blockSize} />
      );
    })
  );
};

export default Piece;