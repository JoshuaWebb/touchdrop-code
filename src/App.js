import React, { Component } from 'react';

import Canvas from './components/Canvas';

class App extends Component {
  constructor(props) {
    super(props);

    this.oldGameInput = {
      left : { isDown: false, halfTransitionCount: 0 },
      right: { isDown: false, halfTransitionCount: 0 },
      up   : { isDown: false, halfTransitionCount: 0 },
      down : { isDown: false, halfTransitionCount: 0 },
    };

    this.newGameInput = {
      left : { isDown: false, halfTransitionCount: 0 },
      right: { isDown: false, halfTransitionCount: 0 },
      up   : { isDown: false, halfTransitionCount: 0 },
      down : { isDown: false, halfTransitionCount: 0 },
    };

    this.dude = {
      row : -1,
      col : -1,
    };

    this.pieceDebug = {
      next : false,
      prev : false,
    };

    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.click = this.click.bind(this);
  }

  processKey(button, isDown) {
    if (button.isDown !== isDown) {
      button.halfTransitionCount++;
    }
    button.isDown = isDown;
  }

  click(row, col) {
    this.dude.row = row;
    this.dude.col = col;
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
      // ',' (<)
      case 188:
        this.pieceDebug.next = false;
        this.pieceDebug.prev = true;
      break;
      // '.' (>)
      case 190:
        this.pieceDebug.next = true;
        this.pieceDebug.prev = false;
      break;
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

  gameLoop() {
    this.props.moveObjects(this.newGameInput);
    this.props.highlightDude(this.dude);
    this.props.cyclePieces(this.pieceDebug);

    this.pieceDebug.prev = false;
    this.pieceDebug.next = false;
    this.dude.row = -1;
    this.dude.col = -1;

    // save the input from this frame
    // maintain the `isDown` state across frames
    var temp = this.oldGameInput;
    this.oldGameInput = this.newGameInput;
    this.newGameInput = temp;
    this.newGameInput.left.isDown = this.oldGameInput.left.isDown;
    this.newGameInput.left.halfTransitionCount = 0;
    this.newGameInput.right.isDown = this.oldGameInput.right.isDown;
    this.newGameInput.right.halfTransitionCount = 0;
    this.newGameInput.up.isDown = this.oldGameInput.up.isDown;
    this.newGameInput.up.halfTransitionCount = 0;
    this.newGameInput.down.isDown = this.oldGameInput.down.isDown;
    this.newGameInput.down.halfTransitionCount = 0;
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

    setInterval(this.gameLoop, 33);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown);
    document.removeEventListener("keyup", this.keyup);
  }

  render() {
    return (
      <Canvas
        pos={this.props.pos}
        dude={this.props.dude}
        currentPiece={this.props.currentPiece}
        click={this.click}
      />
    );
  }
}

export default App;
