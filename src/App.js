import React, { Component } from 'react';

import Canvas from './components/Canvas';

import { fieldWidthInBlocks, fieldHeightInBlocks,
         blockSizeInUnits } from './constants'

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

    this.touchStartedNearField = false;

    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.click = this.click.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
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

  selectOrientation(orientation) {
    // TODO: set the selected orientation
    console.log(orientation);
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

  // TODO: we probably will want to do these way more
  // efficiently in the future. These are highly likely
  // to cause a boat load of GC
  canvasPoint(event) {
    const svg = document.getElementById('game-canvas');
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
    return {x, y};
  }

  fieldPoint(canvasPoint) {
    // TODO: don't hardcode these
    const fieldX = -130;
    const fieldY = -620;

    const fcpx = canvasPoint.x - fieldX;
    const fcpy = canvasPoint.y - fieldY;

    const col = Math.floor(fcpx / blockSizeInUnits);
    const row = Math.floor(fcpy / blockSizeInUnits);

    return {col, row}
  }

  touchStart(event) {
    var firstTouch = false;
    for (let touch of event.changedTouches) {
      if (touch.identifier === 0) {
        firstTouch = true;
      }
    }

    if (!firstTouch) {
      return;
    }

    this.dude.row = -1;
    this.dude.col = -1;
    const cp = this.canvasPoint(event.touches[0]);
    const fp = this.fieldPoint(cp);

    // Allow the touch to start just outside the field,
    // there shouldn't be a difference to the fudge-factor
    // just because they missed on the "wrong side" of the
    // edge cells. But not in another element.
    const insideField = (
      fp.col > -1 && fp.col < fieldWidthInBlocks &&
      fp.row > -1 && fp.row < fieldHeightInBlocks
    );

    const closeToField = (
      fp.col >= -1 && fp.col <= fieldWidthInBlocks &&
      fp.row >= -1 && fp.row <= fieldHeightInBlocks
    );

    if (insideField || (event.target.id === "background" && closeToField))
    {
      event.preventDefault();
      this.touchStartedNearField = true;
    }

    if (insideField)
    {
      this.dude.row = fp.row;
      this.dude.col = fp.col;
    }
  }

  touchMove(event) {
    if (!this.touchStartedNearField) {
      return;
    }

    const cp = this.canvasPoint(event.touches[0]);
    const fp = this.fieldPoint(cp);

    if (fp.col > -1 && fp.col < fieldWidthInBlocks &&
        fp.row > -1 && fp.row < fieldHeightInBlocks)
    {
      this.dude.row = fp.row;
      this.dude.col = fp.col;
    }
  }

  touchEnd(event) {
    var firstTouch = false;
    for (let touch of event.changedTouches) {
      if (touch.identifier === 0) {
        firstTouch = true;
      }
    }

    if (!firstTouch) {
      return;
    }

    if (this.touchStartedNearField) {
      event.preventDefault();
    }

    // TODO: this will probably be the trigger
    // to attempt to drop the piece rather
    // than clearing the row/col
    this.dude.row = -1;
    this.dude.col = -1;

    this.touchStartedNearField = false;
  }

  gameLoop() {
    this.props.moveObjects(this.newGameInput);
    this.props.highlightDude(this.dude);
    this.props.cyclePieces(this.pieceDebug);

    this.pieceDebug.prev = false;
    this.pieceDebug.next = false;
    // this.dude.row = -1;
    // this.dude.col = -1;

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
        touchStart={this.touchStart}
        touchMove={this.touchMove}
        touchEnd={this.touchEnd}
        selectOrientation={this.selectOrientation}
      />
    );
  }
}

export default App;
