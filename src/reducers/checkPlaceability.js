// TODO: I think this is probably bad style to be in the component...
import { checkPlaceability } from '../components/Piece';

export default (state, data) => {
  const { x, y, piece, orientation, field, pathMatrix } = data;
  const oldPlaceable = state.placeable;
  var newPlaceable = checkPlaceability(x, y, piece, orientation, field, pathMatrix);

  if (oldPlaceable === newPlaceable) {
    return state;
  }

  return {
    ...state,
    placeable: newPlaceable,
  };
};
