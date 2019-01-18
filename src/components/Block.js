import React from 'react';

// TODO: css?
//       more advanced skinning / shapes for blocks?
const blockStyles = [
  { fill: '#708090', strokeWidth: 1, stroke: 'white', }, // I
  { fill: '#f5c635', strokeWidth: 1, stroke: 'white', }, // L
  { fill: '#ee8817', strokeWidth: 1, stroke: 'white', }, // O
  { fill: '#47b450', strokeWidth: 1, stroke: 'white', }, // Z
  { fill: '#ee575b', strokeWidth: 1, stroke: 'white', }, // T
  { fill: '#9155f4', strokeWidth: 1, stroke: 'white', }, // J
  { fill: '#009fd4', strokeWidth: 1, stroke: 'white', }, // S
];

const Block = (props) => {
  return (
    <rect
      x={props.x}
      y={props.y}
      width={props.blockSize}
      height={props.blockSize}
      style={blockStyles[props.piece]} />
  )
};

export default Block;