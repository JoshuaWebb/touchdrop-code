import React, { Component } from 'react';

import Canvas from './components/Canvas';

import BagRandomizer from './randomizers/BagRandomizer';

import {
  fieldWidthInBlocks, fieldHeightInBlocks,
  blockSizeInUnits, hiddenHeight,
} from './constants';

import {
  placeBlock, PIECE_NONE, ORIENTATION_NONE,
  ORIENTATION_UP, ORIENTATION_RIGHT,
  ORIENTATION_DOWN, ORIENTATION_LEFT,
} from './components/Piece';

class App extends Component {
  constructor(props) {
    super(props);

    // internal state
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

    this.activeTouches = 0;
    this.mouseIsDown = false;

    this.activePosition = {
      row : -1,
      col : -1,
    };

    this.pieceDebug = {
      next : false,
      prev : false,
    };

    // TODO: we need some buffer at the top to account for placing
    // pieces at the top of the field that extend off the top.
    // The buffer should not be rendered.
    this.field = {
      blocks: this.props.field.blocks.map(r =>
        [...r]
      ),
      hiddenBlocks: this.props.field.hiddenBlocks.map(r =>
        [...r]
      ),
      lineClearFlags: [...this.props.field.lineClearFlags],
      hiddenLineClearFlags: [...this.props.field.hiddenLineClearFlags],
    };

    this.initialiseLayout();

    this.orientation = props.orientation;

    // TODO: use a seedable random function
    this.randomizer = new BagRandomizer(Math.random);

    // TODO: temporary; we need a "start" button
    this.rollNextPiece();

    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.selectOrientation = this.selectOrientation.bind(this);
    this.updateOrientation = this.updateOrientation.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp   = this.mouseUp.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    // we don't need any special logic for tracking
    // the initial touches at the moment.
    this.touchStart = this.touchMove;

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp   = this.mouseUp.bind(this);
  }

  initialiseLayout() {
    const previewSize = 65;

    //
    // Field
    //
    const yOffset = 100;
    const fieldWidth  = blockSizeInUnits * fieldWidthInBlocks;
    const fieldHeight = blockSizeInUnits * fieldHeightInBlocks;

    this.fieldDimensions = {
      // Center the field (but shift over for the preview pieces)
      x: fieldWidth / -2 - previewSize/2,
      y: -yOffset-fieldHeight,
      blockSize: blockSizeInUnits,
      rows: fieldHeightInBlocks,
      cols: fieldWidthInBlocks,
      width: fieldWidth,
      height: fieldHeight,
    };

    //
    // Orientation selectors
    //
    const orientations = [
      ORIENTATION_LEFT,
      ORIENTATION_UP,
      ORIENTATION_RIGHT,
      ORIENTATION_DOWN
    ];

    const osMargin = 16;
    const osSize = 70;
    const osYStart = -yOffset + osMargin;

    const allOsWidth = (osSize * orientations.length + osMargin * (orientations.length - 1));
    const osXStart = (allOsWidth / -2);

    this.orientationSelectors = orientations.map((orientation, i) => ({
      x: osXStart + (osSize + osMargin)*i,
      y: osYStart,
      width: osSize,
      height: osSize,
      orientation: orientation,
    }));

    //
    // Preview pieces
    //

    // We want to emphasize the next piece more than the
    // rest, but we still want everything to be centered.
    const minorReduction = 10;

    const psXStart = this.fieldDimensions.x + fieldWidth;
    const psYStart = this.fieldDimensions.y + fieldHeight - previewSize;
    this.previewSlots = Array(this.props.previewLength).fill(0).map((_, i) => {
      return {
        x: psXStart + (i === 0 ? 0 : minorReduction / 2),
        y: psYStart - (previewSize - minorReduction)*i,
        width: previewSize - (i === 0 ? 0 : minorReduction),
        height: previewSize - (i === 0 ? 0 : minorReduction),
        index: i,
      }
    });
  }

  processKey(button, isDown) {
    if (button.isDown !== isDown) {
      button.halfTransitionCount++;
    }
    button.isDown = isDown;
  }

  // TODO: We should change the name of one of these
  // to disambiguate it from the action that actually
  // updates the state/container.
  selectOrientation(orientation) {
    this.orientation = orientation;
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
    const fcpx = canvasPoint.x - this.fieldDimensions.x;
    const fcpy = canvasPoint.y - this.fieldDimensions.y;

    const col = Math.floor(fcpx / blockSizeInUnits);
    const row = Math.floor(fcpy / blockSizeInUnits);

    return {col, row};
  }

  updateOrientation(canvasPoint) {
    const { x, y } = canvasPoint;

    for (var i = 0; i < this.orientationSelectors.length; i++) {
      const os = this.orientationSelectors[i];
      if (y > os.y && y < os.y + os.height &&
          x > os.x && x < os.x + os.width) {
        this.selectOrientation(os.orientation);
        break;
      }
    }
  }

  dragMove(canvasPoint) {
    this.updateOrientation(canvasPoint);

    const fp = this.fieldPoint(canvasPoint);
    if (fp.col > -1 && fp.col < fieldWidthInBlocks &&
        fp.row > -1 && fp.row < fieldHeightInBlocks)
    {
      this.activePosition.row = fp.row;
      this.activePosition.col = fp.col;
    }
  }

  dragEnd() {
    if (this.activeTouches === 0 && !this.mouseIsDown) {
      this.place = true;
    }
  }

  mouseDown(event) {
    event.preventDefault();
    this.mouseIsDown = true;

    const cp = this.canvasPoint(event);
    this.dragMove(cp);
  }

  mouseMove(event) {
    event.preventDefault();
    if (this.mouseIsDown) {
      const cp = this.canvasPoint(event);
      this.dragMove(cp);
    }
  }

  mouseUp(event) {
    event.preventDefault();
    this.mouseIsDown = false;
    this.dragEnd();
  }

  touchMove(event) {
    this.activeTouches = event.touches.length;

    // Note: if multiple touches are inside the field
    // then the "last" one wins whichever that happens
    // to be.
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      const cp = this.canvasPoint(touch);
      this.dragMove(cp);
    }
  }

  touchEnd(event) {
    event.preventDefault();
    this.activeTouches = event.touches.length;
    this.dragEnd();
  }

  isLineFilled(line) {
    const lineLength = line.length;
    for (let col = 0; col < lineLength; col++) {
      const block = line[col];
      if (block === PIECE_NONE) {
        return false;
      }
    }

    return true;
  }

  setLineClearedFlag(row, field, flag) {
    if (row >= 0) {
      field.lineClearFlags[row] = flag;
    } else {
      field.hiddenLineClearFlags[(row * -1) - 1] = flag;
    }
  }

  getLineClearedFlag(row, field) {
    return field.lineClearFlags[row] || field.hiddenLineClearFlags[(row * -1) - 1];
  }

  getRow(row, field) {
    return field.blocks[row] || field.hiddenBlocks[(row * -1) - 1];
  }

  // NOTE: this was originally ported pretty directly from Nullpomino
  downFloatingBlocks(field) {
    const fieldHeight = field.blocks.length;
    const fieldWidth = field.blocks[0].length;

    var y = fieldHeight - 1;
    for (let i = hiddenHeight * -1; i < fieldHeight; i++) {
      if (this.getLineClearedFlag(y, field)) {
        for (let k = y; k > hiddenHeight * -1; k--) {
          const rowUp = this.getRow(k-1, field);
          const row   = this.getRow(k, field);
          for (let l = 0; l < fieldWidth; l++) {
            const blk = rowUp === undefined ? PIECE_NONE : rowUp[l];
            row[l] = blk;
          }

          this.setLineClearedFlag(k, field, this.getLineClearedFlag(k-1, field));
        }

        // clear the top (we really only need to do this once)
        for (let l = 0; l < fieldWidth; l++) {
          const topRow = field.hiddenBlocks[hiddenHeight - 1];
          topRow[l] = PIECE_NONE;
        }
      } else {
        y--;
      }
    }
  }

  doLineClears(field) {
    var linesCleared = 0;
    var firstLine = -1;
    const fieldHeight = field.blocks.length;

    for(let r = hiddenHeight * -1; r < fieldHeight; r++) {
      const row = this.getRow(r, field);
      const filled = this.isLineFilled(row);

      if (filled) {
        const rowLength = row.length;
        for (let c = 0; c < rowLength; c++) {
          row[c] = PIECE_NONE;
        }
        linesCleared++;
        this.setLineClearedFlag(r, field, true);

        if (firstLine === -1) {
          firstLine = r;
        }
      }
    }

    // TODO: split out and do later
    // after some frames for animation purposes?
    if (linesCleared > 0) {
      this.downFloatingBlocks(field);
    }

    return linesCleared;
  }

  rollNextPiece() {
    let nextPiece;
    if (this.props.nextPieces.length === 0) {
      nextPiece = this.randomizer.next();
    } else {
      nextPiece = this.props.nextPieces[0];
    }

    const nextPieces = this.props.nextPieces.slice(1);
    while (nextPieces.length < this.props.previewLength) {
      nextPieces.push(this.randomizer.next());
    }

    this.props.nextPiece(nextPiece, nextPieces);
  }

  gameLoop() {
    this.props.setActiveGridPosition(this.activePosition);
    this.props.cyclePieces(this.pieceDebug);
    this.props.checkPlaceability(
      this.activePosition.col, this.activePosition.row,
      this.props.currentPiece, this.orientation,
      this.field
    );

    if (this.place) {
      var placed = false;
      if (this.props.placeable) {
        // update our internal field
        placeBlock(
          this.activePosition.col, this.activePosition.row,
          this.props.currentPiece, this.orientation,
          this.field
        );

        var lines = this.doLineClears(this.field);
        // TODO: count lines cleared

        // TODO: line clear delay / animation??
        // broadcast to everyone else
        this.props.placeBlock(this.field);


        placed = true;
      }

      // TODO: punishment for trying to drop in a
      //. non-placeable space? or do we just leave
      // it hanging as this currently does.
      this.place = false;

      // TODO: allow placing it as soon as they try
      // to rotate it if that becomes a valid placement?

      if (placed) {
        this.activePosition.row = -1;
        this.activePosition.col = -1;
        this.orientation = ORIENTATION_NONE;
        this.rollNextPiece();
      }
    }

    // Only do after potentially resetting above
    // so that we don't highlight the orientation
    // of the _next_ piece for a single frame if
    // we select the orientation and the destination
    // in the same frame.
    this.props.selectOrientation(this.orientation);

    this.pieceDebug.prev = false;
    this.pieceDebug.next = false;

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
        activePosition={this.props.activePosition}
        orientationSelectors={this.orientationSelectors}
        previewSlots={this.previewSlots}
        nextPieces={this.props.nextPieces}
        fieldDimensions={this.fieldDimensions}
        currentPiece={this.props.currentPiece}
        orientation={this.props.orientation}
        placeable={this.props.placeable}
        blocks={this.props.field.blocks}
        blockCount={this.props.blockCount}
        touchStart={this.touchStart}
        touchMove={this.touchMove}
        touchEnd={this.touchEnd}
        mouseDown={this.mouseDown}
        mouseMove={this.mouseMove}
        mouseUp={this.mouseUp}
      />
    );
  }
}

export default App;
