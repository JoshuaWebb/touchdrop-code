// TODO: I think this is probably bad style to be in the component...
import { checkPlaceability, hasPath } from '../components/Piece';

export default (state, data) => {
  const { x, y, piece, orientation, field } = data;
  const oldPlaceable = state.placeable;
  var newPlaceable = checkPlaceability(x, y, piece, orientation, field) &&
    hasPath(x, y, piece, orientation, field);
  
  if (oldPlaceable === newPlaceable) {
    return state;
  }

  return {
    ...state,
    placeable: newPlaceable,
  };
};
