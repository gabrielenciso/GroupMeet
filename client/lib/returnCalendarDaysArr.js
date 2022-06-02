

function returnCalendarDaysArr(date) {
  (arr = []).length = 35;
  arr.fill(0)

  const dateData = {
    dayVal: date.getDate(),  // 1-30
    dayOfWeekVal: date.getDay(),  // 0-6
    monthVal: date.getMonth(),
    yearVal: date.getFullYear()
  }

  const { dayVal, dayOfWeekVal, monthVal, yearVal } = dateData;

  // fill back wards

  let currDay = dayVal;
  // let currDay = {
  //   month: monthVal,
  //   day: dayVal,
  //   year: yearVal,
  //   week: dayOfWeekVal
  // }

  console.log(dayVal);
  console.log(currDay);

  for (let i = dayOfWeekVal; i >= 0; i--) {

    if (currDay === 0) {
      currDay = 32 - new Date(yearVal, (monthVal - 1), 32).getDate();
      // currDay.month = currDay.month - 1;
    }

    arr.splice(i, 1, currDay);
    currDay--;
  }

  // fill forward
  currDay = dayVal;
  for (let j = dayOfWeekVal; j < arr.length; j++) {
    if (currDay > ( 32 - new Date(yearVal, monthVal, 32).getDate())) {
      currDay = 1;
    }

    arr.splice(j, 1, currDay);
    currDay++
  }

  return arr;
}

const output = returnCalendarDaysArr(new Date());
console.log(output);

export default returnCalendarDaysArr;
