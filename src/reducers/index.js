import { MOVE_OBJECTS, HIGHLIGHT_DUDE } from '../actions';
import moveObjects from './moveObjects';
import highlightDude from './highlightDude';

const initialState = {
  pos: {
    x:  400,
    y: -100,
  },
  dude: {
    row: -1,
    col: -1,
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE_OBJECTS:
      return moveObjects(state, action);
    case HIGHLIGHT_DUDE:
      return highlightDude(state, action);
    default:
      return state;
  }
}

export default reducer;
