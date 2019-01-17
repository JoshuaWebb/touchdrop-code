import React from 'react';
import './Field.css';

import { fieldWidthInBlocks, fieldHeightInBlocks,
         blockSizeInUnits } from '../constants'

const Field = (props) => {
  const borderStyle = {
    fill: 'transparent',
    strokeWidth:1,
    stroke: '#FFFFFF',
  };
  // TODO: take from outside / make less arbitrary
  const width = blockSizeInUnits * fieldWidthInBlocks;
  const height = blockSizeInUnits * fieldHeightInBlocks;

  const yOffset = 50;
  const xLeft = width / -2;
  const yTop = -yOffset-height;

  var selectedRow = props.dude.row;
  var selectedCol = props.dude.col;

  var grid = [];
  for (var r = 0; r < fieldHeightInBlocks; r++) {
    for (var c = 0; c < fieldWidthInBlocks; c++) {
      const id = `${r}-${c}`;
      var gridBlock = <rect
          id={id}
          key={id}
          x={xLeft + c * blockSizeInUnits}
          y={yTop + r * blockSizeInUnits}
          width={blockSizeInUnits}
          height={blockSizeInUnits}
          onClick={props.click.bind(this, r, c)}
          className={"grid-block " + ((r === selectedRow && c === selectedCol) ? "grid-block-flash" : "") }
        />;
      grid.push(gridBlock);
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
        pointerEvents="none"
      />
    </g>
  );
};

export default Field;
