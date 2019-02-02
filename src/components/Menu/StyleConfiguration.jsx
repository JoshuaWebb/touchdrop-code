import React, { Component } from 'react';

import './StyleConfiguration.css';
import './Menu.css';

import {
  blockSizeInUnits,
  defaultStyles,
  MENU_MAIN,
} from '../../constants';

import Piece, { ORIENTATION_UP } from '../Piece';

class StyleConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: Object.assign({}, props.config.blockStyles),
    };
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      colors: {
        ...this.state.colors,
        [name]: {
          fill: value,
        },
      }
    });
  }

  save = () => {
    const config = {
      blockStyles: Object.values(this.state.colors)
    };

    this.props.updateConfig(config);
    this.props.setMenu(MENU_MAIN);
  }

  reset = () => {
    this.setState({
      colors: Object.assign({}, defaultStyles),
    });
  }

  cancel = () => {
    this.props.setMenu(MENU_MAIN);
  }

  render() {
    const { config: { blockStyles } } = this.props;
    const blockSize = blockSizeInUnits;

    const viewBox = [0, 0, blockSize * 4, blockSize * 4];
    const items = blockStyles.map((p, i) =>
      <li key={i} className="color-config-item">
        <svg
          shapeRendering="crispEdges"
          preserveAspectRatio="xMidYMid slice"
          width={blockSize * 3}
          height={blockSize * 2.25}
          viewBox={viewBox}
        >
          <Piece
            piece={i}
            orientation={ORIENTATION_UP}
            blockSize={blockSize}
            blockStyles={this.state.colors}
            cx={blockSize * 2}
            cy={blockSize * 2}
          />
        </svg>
        <label
          className="color-picker"
          style={{
            backgroundColor: this.state.colors[i].fill,
            width: "30px",
            height: "30px",
          }}
          htmlFor={"cp-" + i} >
          <input
            className="color-picker"
            type="color"
            id={"cp-" + i}
            name={i}
            value={this.state.colors[i].fill}
            onChange={this.changeHandler} />
        </label>
        <input
          type="text"
          id={"ct-" + i}
          name={i}
          value={this.state.colors[i].fill}
          onChange={this.changeHandler} />
      </li>
    );

    return (
      <div className="menu">
        <ul className="color-config-items">
          {items}
        </ul>
        <ul>
          <li className="button cancel" onClick={this.cancel}>
            CANCEL
          </li>
          <li className="button reset" onClick={this.reset}>
            RESET TO DEFAULTS
          </li>
          <li className="button save" onClick={this.save}>
            SAVE
          </li>
        </ul>
      </div>
    )
  }
};

export default StyleConfiguration;
