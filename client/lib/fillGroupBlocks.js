
function fillGroupBlocks(userId, userBlocks, groupBlocks) {
  const fillBlocks = groupBlocks.blocks

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

    // if (fillBlocks[row][col].includes(userId)) {
    //   continue;
    // } else {
    //   fillBlocks[row][col].push(userId);
    // }
  }

  return fillBlocks;
}

export default fillGroupBlocks;

// const userId = 14;

// const userBlocks = {
//   selected: [
//     {
//       row: '0',
//       col: '0'
//     },
//     {
//       row: '0',
//       col: '1'
//     },
//     {
//       row: '0',
//       col: '2'
//     },
//     {
//       row: '0',
//       col: '3'
//     }
//   ]
// }

// const groupBlocks ={
//   blocks: [
//     [[], [], [], [], []],
//     [[], [], [], [], []],
//     [[], [], [], [], []],
//     [[], [], [], [], []]
//   ]
// }

// console.log(fillGroupBlocks(userId, userBlocks, groupBlocks));
