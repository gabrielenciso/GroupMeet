
function returnCalendarDaysArr(date) {
  const arr = [];
  arr.length = 35;
  arr.fill({})

  const dateData = {
    dayVal: date.getDate(),  // 1-30
    dayOfWeekVal: date.getDay(),  // 0-6
    monthVal: date.getMonth(),
    yearVal: date.getFullYear()
  }

  const { dayVal, dayOfWeekVal, monthVal, yearVal } = dateData;

  // fill back wards
  for (let i = dayOfWeekVal; i >= 0; i--) {

    const currDay = new Date(date);
    currDay.setDate(currDay.getDate() - (dayOfWeekVal - i));

    arr.splice(i, 1, currDay);
  }

  // fill forward
  for (let i = dayOfWeekVal; i < arr.length; i++) {

    const currDay = new Date(date);
    currDay.setDate(currDay.getDate() + (i - dayOfWeekVal));

    arr.splice(i, 1, currDay);
  }

  return arr;
}

export default returnCalendarDaysArr;
// module.exports = returnCalendarDaysArr;
