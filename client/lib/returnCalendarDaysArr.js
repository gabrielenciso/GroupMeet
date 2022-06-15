
function returnCalendarDaysArr(date, scrollCount) {
  const arr = [];
  arr.length = 35;
  arr.fill({});

  const dayOfWeekVal = date.getDay();

  for (let i = dayOfWeekVal; i >= 0; i--) {

    const currDay = new Date(date);
    if (scrollCount > 0) {
      currDay.setDate(currDay.getDate() + (scrollCount * 7));
    }

    currDay.setDate(currDay.getDate() - (dayOfWeekVal - i));
    arr.splice(i, 1, currDay);
  }

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
