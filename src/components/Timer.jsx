import React from 'react';

import { millisecondsToTimestamp } from '../util';

const Timer = (props) => {
  const {
    x, y,
    timerMillis,
  } = props;

  const style = {
    fontSize: 30,
    fill: '#cfabec',
  }

  const timestamp = millisecondsToTimestamp(timerMillis);

  return (
    <text
      x={x}
      y={y}
      style={style}>
    {timestamp}
    </text>
  );
};

export default Timer;
