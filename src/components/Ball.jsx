import React from 'react';

const Ball = (props) => {
  return (
    <circle fill="white"
            cx={props.pos.x}
            cy={props.pos.y} r={50}
            shapeRendering="auto" />
  )
};

export default Ball;