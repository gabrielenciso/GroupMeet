const chunk = require('lodash/chunk');
// const flatten = require('lodash/flatten');

function returnYearLabels(arrayDates) {

  const chunked = chunk(arrayDates, 7);
  const years = [];

  for (let i = 0; i < chunked.length; i++) {
    let year = 0;

    for (let j = 0; j < chunked[i].length; j++) {
      const yearVal = chunked[i][j].getFullYear();

      if (year < yearVal) {
        year = yearVal;
      }

    }
    years.push(year);
  }

  return years;
}

export default returnYearLabels;
