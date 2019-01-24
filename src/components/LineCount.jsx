import React from 'react';

const LineCount = (props) => {

  const style = {
    fontFamily: 'Roboto',
    fontSize: 30,
    fill: '#cfabec',
  }

  return (
    <text textAnchor="end" x={props.x} y={props.y} style={style}>
      {props.linesCleared} / {props.target}
    </text>
  )
};

export default LineCount;