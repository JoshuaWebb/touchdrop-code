import React from 'react';

import Piece from './Piece';

const OrientationSelector = (props) => {
  const piece = props.piece;
  const orientation = props.orientation;
  const style = {
    fill: 'transparent',
    strokeWidth: 1.5,
    stroke: '#FFFFFF',
  };

  return (
    <g>
      <rect
        fill="transparent"
        x={props.x}
        y={props.y}
        rx={6}
        ry={6}
        width={props.width}
        height={props.height}
        shapeRendering="auto"
        style={style} />
      <Piece
        piece={piece}
        orientation={orientation}
        blockSize={16}
        cx={props.x + props.width / 2}
        cy={props.y + props.height / 2}
      />
    </g>
  )
};

export default OrientationSelector;
