import React from 'react';

import Piece, { PIECE_NONE, ORIENTATION_RIGHT } from './Piece';

const PreviewPiece = (props) => {
  const { x, y, width, height, piece, blockStyles } = props;
  if (piece === undefined || piece === PIECE_NONE) {
    return null;
  }

  const orientation = ORIENTATION_RIGHT;
  const padding = 4;
  const blockSize = (width - padding * 2) / 4;

  return (
    <Piece
      piece={piece}
      orientation={orientation}
      blockSize={blockSize}
      blockStyles={blockStyles}
      cx={x + width / 2}
      cy={y + height / 2}
    />
  )
};

export default PreviewPiece;
