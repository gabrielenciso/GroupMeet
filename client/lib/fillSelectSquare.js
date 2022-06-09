
function fillSelectSquare(initial, current) {
  let { row: initRow, col: initCol } = initial;
  let { row: currRow, col: currCol } = current;
  initRow = parseInt(initRow);
  initCol = parseInt(initCol);
  currRow = parseInt(currRow);
  currCol = parseInt(currCol);

  const fill = [];
  if (initRow > currRow && initCol > currCol) {
    for (let i = initRow; i >= currRow; i--) {
      for (let j = initCol; j >= currCol; j--) {
        const block = {
          row: i.toString(),
          col: j.toString()
        };
        fill.push(block);
      }
    }
  } else if (initRow < currRow && initCol < currCol) {
    for (let i = initRow; i < currRow + 1; i++) {
      for (let j = initCol; j < currCol + 1; j++) {
        const block = {
          row: i.toString(),
          col: j.toString()
        };
        fill.push(block);
      }
    }
  } else if (initRow < currRow && initCol > currCol) {
    for (let i = initRow; i < currRow + 1; i++) {
      for (let j = initCol; j >= currCol; j--) {
        const block = {
          row: i.toString(),
          col: j.toString()
        };
        fill.push(block);
      }
    }
  } else if (initRow > currRow && initCol < currCol) {
    for (let i = initRow; i >= currRow; i--) {
      for (let j = initCol; j < currCol + 1; j++) {
        const block = {
          row: i.toString(),
          col: j.toString()
        };
        fill.push(block);
      }
    }
  } else if (initRow > currRow || initCol > currCol) {
    for (let i = initRow; i >= currRow; i--) {
      for (let j = initCol; j >= currCol; j--) {
        const block = {
          row: i.toString(),
          col: j.toString()
        };
        fill.push(block);
      }
    }
  } else {
    for (let i = initRow; i < currRow + 1; i++) {
      for (let j = initCol; j < currCol + 1; j++) {
        const block = {
          row: i.toString(),
          col: j.toString()
        };
        fill.push(block);
      }
    }
  }
  return fill;
}

export default fillSelectSquare;
