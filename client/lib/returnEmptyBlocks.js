
function returnEmptyBlocks(times, days) {

  const blocks = times.slice(1).map(() => days.days.map(() => []));

  return { blocks };
}

export default returnEmptyBlocks;
