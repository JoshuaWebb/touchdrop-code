import React, { Component } from 'react';

import Block from './Block';
import DebugPathMatrix from './DebugPathMatrix';
import DebugPlaceableMatrix from './DebugPlaceableMatrix';
import FieldBackground from './FieldBackground';

class Field extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { activePosition, blockCount, placeableMatrix } = this.props;

    return activePosition.row !== nextProps.activePosition.row ||
           activePosition.col !== nextProps.activePosition.col ||
           (placeableMatrix !== nextProps.placeableMatrix && process.env.NODE_ENV !== 'production') ||
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

    const pathMatrix = (process.env.NODE_ENV !== 'production'
      ? <DebugPathMatrix
        x={x}
        y={y}
        width={width}
        height={height}
        rows={rows}
        cols={cols}
        blockSize={blockSize}
        pathMatrix={this.props.pathMatrix}
        placeableMatrix={this.props.placeableMatrix}
      />
      : null
    );

    const placeableMatrix = (process.env.NODE_ENV !== 'production'
      ? <DebugPlaceableMatrix
          x={x}
          y={y}
          width={width}
          height={height}
          rows={rows}
          cols={cols}
          blockSize={blockSize}
          placeableMatrix={this.props.placeableMatrix}
        />
      : null
    );

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
        {pathMatrix}
        {grid}
        {placeableMatrix}
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
