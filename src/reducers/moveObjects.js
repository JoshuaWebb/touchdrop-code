function moveObjects(state, action) {
  // TODO: optimisation?: Detect no change required and return original state.
  const input = action.input;
  const pos = Object.assign({}, state.pos);

  // TODO: deal with multiple presses
  if (input.left.isDown) {
    pos.x = pos.x - 1;
  }
  if (input.right.isDown) {
    pos.x = pos.x + 1;
  }
  if (input.up.isDown) {
    pos.y = pos.y - 1;
  }
  if (input.down.isDown) {
    pos.y = pos.y + 1;
  }

  return {
    ...state,
    pos,
  };
}

export default moveObjects;
