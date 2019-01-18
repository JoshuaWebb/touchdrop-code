import React from 'react';

import Piece from './Piece';

const OrientationSelector = (props) => {
  const { piece, orientation, selectOrientation } = props;

  const style = {
    fill: 'transparent',
    strokeWidth: 1.5,
    stroke: '#FFFFFF',
  };

  const padding = 4;
  const cornerRadius = 6;
  const blockSize = (props.width - padding * 2) / 4;

  return (
    <g onClick={selectOrientation.bind(this, orientation)} >
      <rect
        fill="transparent"
        x={props.x}
        y={props.y}
        rx={cornerRadius}
        ry={cornerRadius}
        width={props.width}
        height={props.height}
        shapeRendering="auto"
        style={style} />
      <Piece
        piece={piece}
        orientation={orientation}
        blockSize={blockSize}
        cx={props.x + props.width / 2}
        cy={props.y + props.height / 2}
      />
    </g>
  )
};

export default OrientationSelector;
