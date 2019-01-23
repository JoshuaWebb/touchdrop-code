import React from 'react';

import Piece from './Piece';

const style = {
  fill: 'transparent',
  strokeWidth: 1.5,
  stroke: '#FFFFFF',
};

const selectedStyle = {
  fill: '#FFFFFF3F',
  strokeWidth: 1.5,
  stroke: '#FFFFFF',
};

const OrientationSelector = (props) => {
  const { x, y, width, height, piece, orientation, selected, } = props;

  const padding = 4;
  const cornerRadius = 6;
  const blockSize = (width - padding * 2) / 4;

  return (
    <g>
      <rect
        fill="transparent"
        x={x}
        y={y}
        rx={cornerRadius}
        ry={cornerRadius}
        width={width}
        height={height}
        shapeRendering="auto"
        style={selected ? selectedStyle : style} />
      <Piece
        piece={piece}
        orientation={orientation}
        blockSize={blockSize}
        cx={x + width / 2}
        cy={y + height / 2}
      />
    </g>
  )
};

export default OrientationSelector;
