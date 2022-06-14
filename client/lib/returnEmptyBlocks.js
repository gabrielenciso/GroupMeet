
function returnEmptyBlocks(times, days) {

  const rows = [];
  for (let i = 0; i < times.length - 1; i++) {
    const row = [];
    for (let j = 0; j < days.days.length; j++) {
      row.push([]);
    }
    rows.push(row);
  }

  return {
    blocks: rows
  };
}

export default returnEmptyBlocks;
