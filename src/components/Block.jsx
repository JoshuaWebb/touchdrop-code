import React from 'react';

import './Block.css';

import { PIECE_NONE } from './Piece';

const Block = (props) => {
  const classes = ("grid-block " +
    (props.flash ? "grid-block-flash " : "") +
    (props.piece !== PIECE_NONE ? "piece-block " : "") +
    (props.placeable === false ? "cannot-place " : "")
  );

  return (
    <rect
      x={props.x}
      y={props.y}
      width={props.blockSize}
      height={props.blockSize}
      style={props.blockStyles[props.piece]}
      className={classes}
     />
  )
};

export default Block;
