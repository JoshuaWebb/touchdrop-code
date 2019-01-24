import React, { Component } from 'react';

import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { pressed: false };
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }

  touchStart(event) {
    event.stopPropagation();
    this.setState({pressed: true})
  }

  touchMove(event) {
    event.stopPropagation();
  }

  touchEnd(event) {
    event.stopPropagation();
    this.setState({pressed: false})
  }

  render() {
    const style = {
      fill: (this.state.pressed ?
              (this.props.pressedColor || this.props.color) :
              this.props.color),
    };

    const textStyle = {
      pointerEvents: "none",
      userSelect: "none",
      fontFamily: "Roboto",
      // TODO: dynamic font size (or dynamic width?)
      fontSize: 14,
      fill: (this.props.textColor || "white"),
    };

    return (
      <g onTouchStart={this.touchStart}
         onTouchMove={this.touchMove}
         onTouchEnd={this.touchEnd}
         onClick={this.props.onPressed}>
        <rect
          x={this.props.x}
          y={this.props.y}
          rx={6}
          ry={6}
          width={this.props.width}
          height={this.props.height}
          style={style}
          className={"button " + this.props.className}
          shapeRendering="auto"
        />
        <text
          x={this.props.x + this.props.width / 2}
          y={this.props.y + this.props.height / 2}
          textAnchor="middle"
          style={textStyle}
          className={"button " + this.props.className}
          alignmentBaseline="central"
          dominantBaseline="central"
        >{this.props.text}</text>
      </g>
    );
  }
}

export default Button;
