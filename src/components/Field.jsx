import React from 'react';

import { fieldWidthInBlocks, fieldHeightInBlocks,
         blockSizeInUnits } from '../constants'

const Field = () => {
  const borderStyle = {
    fill: 'transparent',
    strokeWidth:1,
    stroke: '#FFFFFF',
  };

  const gridStyle = {
    fill: '#232323',
    strokeWidth:1,
    stroke: '#FFFFFF33',
  }

  // TODO: take from outside / make less arbitrary
  const width = blockSizeInUnits * fieldWidthInBlocks;
  const height = blockSizeInUnits * fieldHeightInBlocks;

  const yOffset = 50;
  const xLeft = width / -2;
  const yTop = -yOffset-height;

  var grid = [];
  for (var r = 0; r < fieldHeightInBlocks; r++) {
    for (var c = 0; c < fieldWidthInBlocks; c++) {
      const id = `${r}-${c}`;
      grid.push(
        <rect
          id={id}
          key={id}
          x={xLeft + c * blockSizeInUnits}
          y={yTop + r * blockSizeInUnits}
          width={blockSizeInUnits}
          height={blockSizeInUnits}
          style={gridStyle}
        />
      );
    }
  }

  return (
    <g id="field">
      {grid}
      <rect
        id="border"
        style={borderStyle}
        x={xLeft}
        y={yTop}
        width={width}
        height={height}
      />
    </g>
  );
};

export default Field;
