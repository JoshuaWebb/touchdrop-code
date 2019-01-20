import React, { Component } from 'react';

import Block from './Block';

import { fieldWidthInBlocks, fieldHeightInBlocks,
         blockSizeInUnits } from '../constants'

class Field extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { dude, blockCount } = this.props;

    return dude.row !== nextProps.dude.row ||
           dude.col !== nextProps.dude.col ||
           blockCount !== nextProps.blockCount;
  }

  render() {
    const borderStyle = {
      fill: 'transparent',
      strokeWidth:1,
      stroke: '#FFFFFF',
    };
    // TODO: take from outside / make less arbitrary :FieldPlacement
    const width = blockSizeInUnits * fieldWidthInBlocks;
    const height = blockSizeInUnits * fieldHeightInBlocks;

    // TODO: centralise these :FieldPlacement
    const yOffset = 100;
    const xLeft = width / -2;
    const yTop = -yOffset-height;

    var selectedRow = this.props.dude.row;
    var selectedCol = this.props.dude.col;

    var grid = [];
    for (var r = 0; r < fieldHeightInBlocks; r++) {
      for (var c = 0; c < fieldWidthInBlocks; c++) {
        const id = r * fieldWidthInBlocks + c;
        const currentBlock = this.props.blocks[r][c];
        const gridBlock =
          <Block
            id={id}
            key={id}
            x={xLeft + c * blockSizeInUnits}
            y={yTop + r * blockSizeInUnits}
            blockSize={blockSizeInUnits}
            piece={currentBlock}
            flash={r === selectedRow && c === selectedCol }
          />;
        grid.push(gridBlock);
      }
    }

    return (
      <g id="field">
        {grid}
        <rect
          id="field-border"
          style={borderStyle}
          x={xLeft}
          y={yTop}
          width={width}
          height={height}
          pointerEvents="none"
        />
      </g>
    );
  }
};

export default Field;
