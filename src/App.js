import React, { Component } from 'react';

import Canvas from './components/Canvas';

class App extends Component {
  constructor(props) {
    super(props);
    this.oldGameInput = {};
    this.newGameInput = {
      left : { isDown: false, halfTransitionCount: 0 },
      right: { isDown: false, halfTransitionCount: 0 },
      up   : { isDown: false, halfTransitionCount: 0 },
      down : { isDown: false, halfTransitionCount: 0 },
    };
    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
  }

  processKey(button, isDown) {
    if (button.isDown !== isDown) {
      button.halfTransitionCount++;
    }
    button.isDown = isDown;
  }

  keydown(event) {
    // TODO: configurable keys
    switch (event.keyCode) {
      // 'a'
      case 65: this.processKey(this.newGameInput.left, true); break;
      // 'd'
      case 68: this.processKey(this.newGameInput.right, true); break;
      // 's'
      case 83: this.processKey(this.newGameInput.down, true); break;
      // 'w'
      case 87: this.processKey(this.newGameInput.up, true); break;
      // no default
    }
  }

  keyup(event) {
    // TODO: configurable keys
    switch (event.keyCode) {
      // 'a'
      case 65: this.processKey(this.newGameInput.left, false); break;
      // 'd'
      case 68: this.processKey(this.newGameInput.right, false); break;
      // 's'
      case 83: this.processKey(this.newGameInput.down, false); break;
      // 'w'
      case 87: this.processKey(this.newGameInput.up, false); break;
      // no default
    }
  }

  componentDidMount() {
    window.onresize = () => {
      const cnv = document.getElementById('game-canvas');
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();

    document.addEventListener("keydown", this.keydown, false);
    document.addEventListener("keyup", this.keyup, false);

    const self = this;
    setInterval(() => {
      self.props.moveObjects(self.newGameInput);

      // save the input from this frame
      self.oldGameInput = self.newGameInput;
      // maintain the `isDown` state across frames
      self.newGameInput = {
        left : { isDown: self.oldGameInput.left.isDown , halfTransitionCount: 0 },
        right: { isDown: self.oldGameInput.right.isDown, halfTransitionCount: 0 },
        up   : { isDown: self.oldGameInput.up.isDown   , halfTransitionCount: 0 },
        down : { isDown: self.oldGameInput.down.isDown , halfTransitionCount: 0 },
      };
    }, 16);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown);
    document.removeEventListener("keyup", this.keyup);
  }

  render() {
    return (
      <Canvas
        pos={this.props.pos}
      />
    );
  }
}

export default App;
