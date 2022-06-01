

function returnCalendarDaysArr(date) {
  (arr = []).length = 35;
  arr.fill(0)

  const dateData = {
    dayVal: date.getDate(),  // 1-30
    dayOfWeek: date.getDay(),  // 0-6
    currMonth: date.getMonth(),
    currYear: date.getYear()
  }

  const { dayVal, dayOfWeek, currMonth, currYear } = dateData;

  // fill back wards
  let currDay = dayVal;
  // for (let i = dayOfWeek; i >= 0; i--) {

  //   if (currDay === 0) {
  //     currDay = 32 - new Date(currYear, (currMonth - 1), 32).getDate();

  //   }
  //   arr.splice(i, 0, currDay);
  //   currDay--;
  // }

  //fill forward
  // currDay = dayVal;
  // for (let j = dayOfWeek; j < arr.length; j++) {

  //   if (currDay > ( 32 - new Date(currYear, currMonth, 32).getDate())) {
  //     currDay = 32 - new Date(currYear, currMonth, 32).getDate();
  //   }

  //   arr.splice(j, 0, currDay);
  //   currDay++
  // }

  console.log('bruuh');
  return arr;
}

const output = returnCalendarDaysArr(new Date());
console.log(output);
