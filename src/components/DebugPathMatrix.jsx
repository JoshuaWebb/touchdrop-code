import React, { Component } from 'react';

class DebugPathMatrix extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { pathMatrix } = this.props;

    return pathMatrix !== nextProps.pathMatrix;
  }

  render() {
    const yesStyle = {
      fill: '#90FF003F',
      strokeWidth:1,
    };

    const noStyle = {
      fill: '#FF00003F',
      strokeWidth:1,
    }

    const {
      x, y,
      blockSize,
      rows, cols,
      pathMatrix,
    } = this.props;

    var grid = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = r * cols + c;
        const gridBlock =
          <rect
            id={id}
            key={id}
            x={x + c * blockSize}
            y={y + r * blockSize}
            width={blockSize}
            height={blockSize}
            style={(pathMatrix[r][c]
              ? yesStyle
              : noStyle)
            }
          />;

        grid.push(gridBlock);
      }
    }

    return (
      <g id="debugPath">
        {grid}
      </g>
    );
  }
};

export default DebugPathMatrix;
