import React, { Component } from 'react';

import MenuScreen from './components/Menu/MenuScreen';
import EndScreen from './components/EndScreen';
import Canvas from './components/Canvas';

import BagRandomizer from './randomizers/BagRandomizer';

import {
  fieldWidthInBlocks, fieldHeightInBlocks,
  blockSizeInUnits, hiddenHeight,
  GAMESTATE_PAUSED, GAMESTATE_MENU, GAMESTATE_END, GAMESTATE_PLAYING,
  GAMEMODE_ZEN,
  GAMEMODE_LINE_TARGET,
} from './constants';

import {
  placeBlock, PIECE_NONE, ORIENTATION_NONE,
  ORIENTATION_UP, ORIENTATION_RIGHT,
  ORIENTATION_DOWN, ORIENTATION_LEFT,
  checkPlaceability,
} from './components/Piece';

const orientations = [
  ORIENTATION_LEFT,
  ORIENTATION_UP,
  ORIENTATION_RIGHT,
  ORIENTATION_DOWN
];

class App extends Component {
  constructor(props) {
    super(props);

    this.initialiseLayout();

    this.keydown = this.keydown.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.selectOrientation = this.selectOrientation.bind(this);
    this.updateOrientation = this.updateOrientation.bind(this);
    this.init = this.init.bind(this);
    this.start = this.start.bind(this);
    this.mainMenu = this.mainMenu.bind(this);
    this.pause = this.pause.bind(this);
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

    this.init();
    props.loadConfig();
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

  // TODO: We should change the name of one of these
  // to disambiguate it from the action that actually
  // updates the state/container.
  selectOrientation(orientation) {
    this.orientation = orientation;
  }

  keydown(event) {
    // TODO: configurable keys
    switch (event.keyCode) {
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

  init() {
    // internal state
    this.pieceDebug = {
      next : false,
      prev : false,
    };

    this.nextPieces = [];

    // TODO: use a seedable random function
    this.randomizer = new BagRandomizer(Math.random);
    this.activeTouches = 0;
    this.mouseIsDown = false;
    this.activePosition = {
      row : -1,
      col : -1,
    };

    this.field = {
      blocks:
        Array(fieldHeightInBlocks).fill(0).map(r =>
          Array(fieldWidthInBlocks).fill(PIECE_NONE)),
      hiddenBlocks:
        Array(hiddenHeight).fill(0).map(r =>
          Array(fieldWidthInBlocks).fill(PIECE_NONE)),
      lineClearFlags: Array(fieldHeightInBlocks).fill(false),
      hiddenLineClearFlags: Array(hiddenHeight).fill(false),
    };

    this.nextPieces.length = 0;

    // TODO: clean up the duplication / inconsistency between this
    // and redux when we initialise / reset the game.
    this.linesCleared = 0;
    this.orientation = ORIENTATION_NONE;
  }

  start() {
    this.init();
    this.props.reset();
    this.rollNextPiece();

    // TODO: "READY" / "GO"
    this.lastPlayingTime = new Date();
    this.totalTimerMillis = 0;
  }

  pause() {
    let newState = GAMESTATE_PAUSED;
    const now = new Date();

    if (this.props.gameState === GAMESTATE_PAUSED) {
      newState = GAMESTATE_PLAYING;
      this.lastPlayingTime = now;
    } else {
      const millisDiff = now - this.lastPlayingTime;
      this.lastPlayingTime = now;
      this.totalTimerMillis += millisDiff;
    }

    this.props.setGameState(newState);
  }

  mainMenu() {
    this.props.setGameState(GAMESTATE_MENU);
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
    if (this.nextPieces.length === 0) {
      nextPiece = this.randomizer.next();
    } else {
      nextPiece = this.nextPieces[0];
    }

    const nextPieces = this.nextPieces = this.nextPieces.slice(1);
    while (nextPieces.length < this.props.previewLength) {
      nextPieces.push(this.randomizer.next());
    }

    this.props.nextPiece(nextPiece, nextPieces);
  }

  checkGameOver(piece, field) {
    if (piece === PIECE_NONE) {
      return false;
    }

    // if there's any slot we can place the piece in any orientation
    // the player can still "continue", even if that will still lead
    // to a game over.
    for (let r = 0; r < field.blocks.length; r++) {
      let row = field.blocks[r];
      for (let c = 0; c < row.length; c++) {
        for (let o of orientations) {
          if (checkPlaceability(c, r, piece, o, field)) {
            return false;
          }
        }
      }
    }

    return true;
  }

  gameLoop() {
    this.props.setActiveGridPosition(this.activePosition);

    if (process.env.NODE_ENV !== 'production') {
      this.props.cyclePieces(this.pieceDebug);
    }

    this.props.checkPlaceability(
      this.activePosition.col, this.activePosition.row,
      this.props.currentPiece, this.orientation,
      this.field
    );

    if (this.props.gameState === GAMESTATE_PLAYING) {
      const now = new Date();
      const millisDiff = now - this.lastPlayingTime;
      this.lastPlayingTime = now;
      this.totalTimerMillis += millisDiff;
      // Checking more than once per piece is redundant at the moment because
      // you can currently place the piece anywhere, but if we change over to
      // using a reference piece we'll need to check every time the reference
      // piece moves.
      let gameIsOver = this.checkGameOver(this.props.currentPiece, this.field);
      if (gameIsOver) {
        this.props.setGameState(GAMESTATE_END);
      }

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
          this.linesCleared += lines;
          this.props.updateStats(this.linesCleared);

          // TODO: line clear delay / animation??
          // broadcast to everyone else
          this.props.placeBlock(this.field);

          placed = true;
        }

        // Check win/end conditions
        switch (this.props.gameMode) {
          case GAMEMODE_ZEN: /* There is no defined goal */ break;
          case GAMEMODE_LINE_TARGET:
            if (this.linesCleared >= this.props.lineTarget) {
              this.props.setGameState(GAMESTATE_END);
            }
          break;

          // no default
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
    }

    this.props.updateTimer(this.totalTimerMillis);

  }

  componentDidMount() {
    window.onresize = () => {
      this.props.resize(window.innerWidth, window.innerHeight);
    };
    window.onresize();

    document.addEventListener("keydown", this.keydown, false);

    setInterval(this.gameLoop, 33);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown);
  }

  render() {
    if (this.props.gameState === GAMESTATE_MENU) {
      return (
        <MenuScreen
          menu={this.props.menu}
          start={this.start} />
      );
    }

    if (this.props.gameState === GAMESTATE_END) {
      return (
        <EndScreen
          gameMode={this.props.gameMode}
          blockCount={this.props.blockCount}
          linesCleared={this.props.linesCleared}
          reset={this.start}
          mainMenu={this.mainMenu}
          timerMillis={this.props.timerMillis}
        />
      );
    }

    return (
      <Canvas
        gameState={this.props.gameState}
        activePosition={this.props.activePosition}
        orientationSelectors={this.orientationSelectors}
        previewSlots={this.previewSlots}
        nextPieces={this.props.nextPieces}
        fieldDimensions={this.fieldDimensions}
        currentPiece={this.props.currentPiece}
        orientation={this.props.orientation}
        placeable={this.props.placeable}
        blocks={this.props.field.blocks}
        config={this.props.config}
        linesCleared={this.props.linesCleared}
        blockCount={this.props.blockCount}
        lineTarget={this.props.lineTarget}
        timerMillis={this.props.timerMillis}
        gameMode={this.props.gameMode}
        reset={this.start}
        mainMenu={this.mainMenu}
        pause={this.pause}
        touchStart={this.touchStart}
        touchMove={this.touchMove}
        touchEnd={this.touchEnd}
        mouseDown={this.mouseDown}
        mouseMove={this.mouseMove}
        mouseUp={this.mouseUp}
        windowWidth={this.props.windowWidth}
        windowHeight={this.props.windowHeight}
      />
    );
  }
}

export default App;
