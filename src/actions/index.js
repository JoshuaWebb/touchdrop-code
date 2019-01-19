export const MOVE_OBJECTS = 'MOVE_OBJECTS';
export const HIGHLIGHT_DUDE = 'HIGHLIGHT_DUDE';
export const CYCLE_PIECES = 'CYCLE_PIECES';
export const SELECT_ORIENTATION = 'SELECT_ORIENTATION';
export const NEXT_PIECE = 'NEXT_PIECE';

export const moveObjects = input => ({
  type: MOVE_OBJECTS,
  input,
});

export const highlightDude = dude => ({
  type: HIGHLIGHT_DUDE,
  dude: dude,
});

export const cyclePieces = debug => ({
  type: CYCLE_PIECES,
  next: debug.next,
  prev: debug.prev,
});

export const selectOrientation = orientation => ({
  type: SELECT_ORIENTATION,
  orientation: orientation,
});

export const nextPiece = () => ({
  type: NEXT_PIECE,
});
