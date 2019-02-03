import React, { Component } from 'react';

import './Menu.css';
import './ImportExportSettings.css';

import {
  MENU_MAIN,
} from '../../constants';

import { validateConfig } from '../../reducers/config';

class ImportExportSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: JSON.stringify(props.config),
      valid: true,
    };
  }

  validateInput = (value) => {
    let config;
    let valid = true;

    try {
      config = JSON.parse(value);
      valid = validateConfig(config);
    } catch (e) {
      valid = false;
    }

    return valid;
  }

  changeHandler = event => {
    const value = event.target.value;
    const valid = this.validateInput(value);
    this.setState({config: value, valid: valid});
  }

  save = () => {
    if (!this.state.valid) {
      return;
    }

    const config = JSON.parse(this.state.config);

    this.props.updateConfig(config);
    this.props.setMenu(MENU_MAIN);
  }

  back = () => {
    this.props.setMenu(MENU_MAIN);
  }

  render() {
    return (
      <div className="menu">
        <div id="config-text-holder">
          <textarea
            id="config-text"
            value={this.state.config}
            className={this.state.valid ? "" : "invalid-input"}
            onChange={this.changeHandler} />
        </div>
        <ul>
          <li className="button cancel" onClick={this.back}>
            BACK
          </li>
          <li className="button save" onClick={this.save}>
            SAVE
          </li>
        </ul>
      </div>
    )
  }
};

export default ImportExportSettings;
