import React from 'react';

import './Block.css';

import { PIECE_NONE } from './Piece';

// TODO: css?
//       more advanced skinning / shapes for blocks?
const blockStyles = [
  { fill: '#708090' }, // I
  { fill: '#f5c635' }, // L
  { fill: '#ee8817' }, // O
  { fill: '#47b450' }, // Z
  { fill: '#ee575b' }, // T
  { fill: '#9155f4' }, // J
  { fill: '#009fd4' }, // S
];

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
      style={blockStyles[props.piece]}
      className={classes}
     />
  )
};

export default Block;