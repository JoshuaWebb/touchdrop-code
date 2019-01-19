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
  const { piece, orientation, selected, selectOrientation } = props;

  const padding = 4;
  const cornerRadius = 6;
  const blockSize = (props.width - padding * 2) / 4;

  return (
    <g onMouseDown={selectOrientation.bind(this, orientation)} >
      <rect
        fill="transparent"
        x={props.x}
        y={props.y}
        rx={cornerRadius}
        ry={cornerRadius}
        width={props.width}
        height={props.height}
        shapeRendering="auto"
        style={selected ? selectedStyle : style} />
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
