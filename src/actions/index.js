export const SET_ACTIVE_GRID_POSITION = 'SET_ACTIVE_GRID_POSITION';
export const CYCLE_PIECES = 'CYCLE_PIECES';
export const SELECT_ORIENTATION = 'SELECT_ORIENTATION';
export const NEXT_PIECE = 'NEXT_PIECE';
export const PLACE_BLOCK = 'PLACE_BLOCK';
export const CHECK_PLACEABILITY = 'CHECK_PLACEABILITY';

export const setActiveGridPosition = activePosition => ({
  type: SET_ACTIVE_GRID_POSITION,
  activePosition: activePosition,
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

export const placeBlock = (field) => ({
  type: PLACE_BLOCK,
  field: field,
});

export const checkPlaceability = (x, y, piece, orientation, field) => ({
  type: CHECK_PLACEABILITY,
  x: x,
  y: y,
  piece: piece,
  orientation: orientation,
  field: field,
});
