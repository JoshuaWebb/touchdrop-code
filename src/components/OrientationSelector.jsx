import React from 'react';

const OrientationSelector = (props) => {
  const piece = props.piece;
  const orientation = props.orientation;
  const style = {
    fill: 'transparent',
    strokeWidth:1,
    stroke: '#FFFFFF',
  };

  return (
    <g>
    <rect fill="transparent"
          x={props.x}
          y={props.y}
          rx={4}
          ry={4}
          width={props.width}
          height={props.height}
          shapeRendering="auto"
          style={style} />
    {/* TODO: <(Preview)?Piece /> */}
    </g>
  )
};

export default OrientationSelector;
