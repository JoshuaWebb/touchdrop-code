export const MOVE_OBJECTS = 'MOVE_OBJECTS';
export const HIGHLIGHT_DUDE = 'HIGHLIGHT_DUDE';

export const moveObjects = input => ({
  type: MOVE_OBJECTS,
  input,
});

export const highlightDude = dude => ({
  type: HIGHLIGHT_DUDE,
  dude: dude,
});
