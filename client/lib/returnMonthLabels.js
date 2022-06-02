var chunk = require('lodash/chunk');
var flatten = require('lodash/flatten');
// var returnCalendarDaysArr = require('./returnCalendarDaysArr.js');

function returnMonthLabels(arrayDates) {

  const chunked = chunk(arrayDates, 7);
  let months = []

  for (let i = 0; i < chunked.length; i++) {
    let month = [];

    for (let j = 0; j < chunked[i].length; j++) {

      const monthNum = chunked[i][j].getMonth();
      let monthName = '';
      if (monthNum === 0) monthName = 'Jan';
      if (monthNum === 1) monthName = 'Feb';
      if (monthNum === 2) monthName = 'Mar';
      if (monthNum === 3) monthName = 'Apr';
      if (monthNum === 4) monthName = 'May';
      if (monthNum === 5) monthName = 'Jun';
      if (monthNum === 6) monthName = 'Jul';
      if (monthNum === 7) monthName = 'Aug';
      if (monthNum === 8) monthName = 'Sep';
      if (monthNum === 9) monthName = 'Oct';
      if (monthNum === 10) monthName = 'Nov';
      if (monthNum === 11) monthName = 'Dec';

      if (!month.includes(monthName)) {
        month.push(monthName);
      }
    }

    if (month.length > 1) {
      month = month.join('/');
    }

    months.push(month);
  }

  months = flatten(months);
  return months;
}

// const arrayDates = returnCalendarDaysArr(new Date());
// console.log(returnMonthLabels(arrayDates));

export default returnMonthLabels;
