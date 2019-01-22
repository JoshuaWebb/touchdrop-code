import React, { Component } from 'react';

import Block from './Block';

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

    const {
      x, y,
      width, height,
      blockSize,
      rows, cols,
      dude: {
        row: selectedRow,
        col: selectedCol
      }
    } = this.props;

    var grid = [];
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        const id = r * cols + c;
        const currentBlock = this.props.blocks[r][c];
        const gridBlock =
          <Block
            id={id}
            key={id}
            x={x + c * blockSize}
            y={y + r * blockSize}
            blockSize={blockSize}
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
          x={x}
          y={y}
          width={width}
          height={height}
          pointerEvents="none"
        />
      </g>
    );
  }
};

export default Field;
