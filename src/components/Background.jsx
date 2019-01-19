import React from 'react';

const Background = () => {
  const style = {
    fill: '#121212',
  };

  // TODO: take from outside / make less arbitrary
  const width = 5000;
  const height = 1200;

  return (
    <rect
      id="background"
      style={style}
      x={width / -2}
      y={-height}
      width={width}
      height={height}
    />
  );
};

export default Background;
