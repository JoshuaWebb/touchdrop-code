import React, { Component } from 'react';

class DebugPlaceableMatrix extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { placeableMatrix } = this.props;

    return placeableMatrix !== nextProps.placeableMatrix;
  }

  render() {
    const {
      x, y,
      blockSize,
      rows, cols,
      placeableMatrix,
    } = this.props;

    const piStyle = {
      fill: 'white',
      fontSize: 12
    };

    var grid = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = r * cols + c;
        const row = placeableMatrix[r];
        if (row && row[c]) {
          const placeIndicator =
          <text
            key={id}
            x={x + c * blockSize + blockSize/2}
            y={y + r * blockSize + blockSize/2}
            style={piStyle}
            textAnchor="middle"
            alignmentBaseline="central"
            dominantBaseline="central"
          >X</text>;
          grid.push(placeIndicator);
        }
      }
    }

    return (
      <g id="debugPlaceable">
        {grid}
      </g>
    );
  }
};

export default DebugPlaceableMatrix;
