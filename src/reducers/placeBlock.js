function getChangedRows(oldField, newField) {
  const changedRows = [];
  const numRows = oldField.length;
  for (let r = 0; r < numRows; r++) {
    const newRow = newField[r];
    const oldRow = oldField[r];

    const numCols = newRow.length;
    for (let c = 0; c < numCols; c++) {
      const newBlock = newRow[c];
      const oldBlock = oldRow[c];

      if (oldBlock !== newBlock) {
        changedRows.push(r);
        break;
      }
    }
  }

  return changedRows;
}

function placeBlock(state, data) {
  const newField = data.field;
  var changedRows = getChangedRows(state.blocks, newField);
  if (changedRows.length === 0) {
    return state;
  }

  const blocks = [...state.blocks];
  for (let r of changedRows) {
    blocks[r] = [...newField[r]];
  }

  return {
    ...state,
    blocks: blocks,
    blockCount: state.blockCount + 1,
  };
}

export default placeBlock;
