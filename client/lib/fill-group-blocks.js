
function fillGroupBlocks(userId, userBlocks, groupBlocks) {
  const fillBlocks = groupBlocks.blocks;

  for (let i = 0; i < fillBlocks.length; i++) {
    for (let j = 0; j < fillBlocks[i].length; j++) {
      const current = fillBlocks[i][j];
      if (current.includes(userId)) {
        current.splice(current.indexOf(userId), 1);
      }
    }
  }

  for (let i = 0; i < userBlocks.selected.length; i++) {
    let { row, col } = userBlocks.selected[i];
    row = parseInt(row);
    col = parseInt(col);

    fillBlocks[row][col].push(userId);

  }

  return fillBlocks;
}

export default fillGroupBlocks;
