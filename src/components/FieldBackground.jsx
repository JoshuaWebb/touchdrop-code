import React from 'react';

import './FieldBackground.css';

class FieldBackground extends React.PureComponent {
  render() {
    const backgroundStyle = { fill: '#232323' };

    const {
      x, y,
      width, height,
      blockSize,
      rows, cols,
    } = this.props;

    var gridlines = [];
    for (let c = 1; c < cols; c++) {
      gridlines.push(<line
        key={`cl${c}`}
        x1={x + c * blockSize} y1={y}
        x2={x + c * blockSize} y2={y + height}
        className="grid-line"
      />);
    }

    for (let r = 1; r < rows; r++) {
      gridlines.push(<line
        key={`rl${r}`}
        x1={x}         y1={y + r * blockSize}
        x2={x + width} y2={y + r * blockSize}
        className="grid-line"
      />);
    }

    return (
      <g>
        <rect
          id="field-background"
          style={backgroundStyle}
          x={x}
          y={y}
          width={width}
          height={height}
          pointerEvents="none"
        />
        {gridlines}
      </g>
    );
  }
};

export default FieldBackground;
