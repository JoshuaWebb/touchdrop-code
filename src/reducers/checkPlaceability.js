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
    // TODO: check if the piece is allowed to be dropped here...
    // i.e. is it resting on something, can the piece actually
    // reach here or is the path to this position blocked.
    const collides = checkCollision(x, y, piece, orientation, field);

    newPlaceable = !collides;
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
