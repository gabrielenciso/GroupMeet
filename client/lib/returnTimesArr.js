function returnTimesArr(startTime, endTime) {
  if (!startTime || !endTime) return;

  let startHour = parseInt(startTime.hour);
  let startMin = parseInt(startTime.minute);
  let startAMPM = startTime.ampm;
  const endHour = parseInt(endTime.hour);
  const endMin = parseInt(endTime.minute);

  const array = [];

  while (1) {
    const time = startMin === 0
      ? `${startHour}:00 ${startAMPM}`
      : `${startHour}:${startMin} ${startAMPM}`;

    array.push(time);

    if (startHour === endHour && startMin === endMin) {
      break;
    }

    startMin += 15;
    if (startMin === 60) {
      startMin = 0;
      startHour++;
      if (startHour > 12) {
        startHour = 1;
        startAMPM = 'PM';
      }
    }

    // if (startHour === endHour && startMin === endMin) {
    //   break;
    // }
  }

  return array;
}

// const startTime = {
//   hour: '10',
//   minute: '0',
//   ampm: 'AM'
// };

// const endTime = {
//   hour: '5',
//   minute: '00',
//   ampm: 'PM'
// }
// const times = returnTimesArr(startTime, endTime);
// console.log(times);

export default returnTimesArr;
