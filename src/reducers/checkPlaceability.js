// TODO: I think this is probably bad style to be in the component...
import { PIECE_NONE, checkCollision } from '../components/Piece';

function checkPlaceability(state, data) {
  const { x, y, piece, orientation, field } = data;
  const oldPlaceable = state.placeable;
  var newPlaceable = false;
  if (piece !== PIECE_NONE &&
      orientation !== -1 &&
      x !== -1 &&
      y !== -1
  ) {
    // TODO: check if the piece has a valid path to get
    // to this position from the top.
    //
    // Idea: Instead of a consant reference point at the top,
    // ave a regular piece dropping slowly and move it
    // left/right as the player drags the destination left/right
    // if the regular piece becomes obstructed, the player can
    // no longer move it in that direction, and if the piece
    // lands in a lockable position before the player lets go
    // lock the piece. The dragging should assume optimal play
    // including valid spins/kicks.
    const collides = checkCollision(x, y, piece, orientation, field);
    const supported = !collides && checkCollision(x, y + 1, piece, orientation, field);
    newPlaceable = !collides && supported;
  }

  if (oldPlaceable === newPlaceable) {
    return state;
  }

  return {
    ...state,
    placeable: newPlaceable,
  };
}

export default checkPlaceability;
