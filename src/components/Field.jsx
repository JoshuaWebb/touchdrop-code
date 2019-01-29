import React, { Component } from 'react';

import Block from './Block';
import FieldBackground from './FieldBackground';

class Field extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { activePosition, blockCount } = this.props;

    return activePosition.row !== nextProps.activePosition.row ||
           activePosition.col !== nextProps.activePosition.col ||
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
      blockStyles,
      activePosition: {
        row: selectedRow,
        col: selectedCol
      }
    } = this.props;


    var grid = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = r * cols + c;
        const currentBlock = this.props.blocks[r][c];
        const gridBlock =
          <Block
            id={id}
            key={id}
            x={x + c * blockSize}
            y={y + r * blockSize}
            blockSize={blockSize}
            blockStyles={blockStyles}
            piece={currentBlock}
            flash={r === selectedRow && c === selectedCol}
          />;
        grid.push(gridBlock);
      }
    }

    return (
      <g id="field">
        <FieldBackground
          x={x}
          y={y}
          width={width}
          height={height}
          rows={rows}
          cols={cols}
          blockSize={blockSize}
        />
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
