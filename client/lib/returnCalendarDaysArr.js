
function returnCalendarDaysArr(date, scrollCount) {
  const arr = [];
  arr.length = 35;
  arr.fill({});

  const dayOfWeekVal = date.getDay();

  // fill back wards
  for (let i = dayOfWeekVal; i >= 0; i--) {

    const currDay = new Date(date);
    if (scrollCount > 0) {
      currDay.setDate(currDay.getDate() + (scrollCount * 7));
    }

    currDay.setDate(currDay.getDate() - (dayOfWeekVal - i));
    arr.splice(i, 1, currDay);
  }

  // fill forward
  for (let i = dayOfWeekVal; i < arr.length; i++) {

    const currDay = new Date(date);
    if (scrollCount > 0) {
      currDay.setDate(currDay.getDate() + (scrollCount * 7));
    }

    currDay.setDate(currDay.getDate() + (i - dayOfWeekVal));
    arr.splice(i, 1, currDay);
  }

  return arr;
}

export default returnCalendarDaysArr;
// module.exports = returnCalendarDaysArr;
