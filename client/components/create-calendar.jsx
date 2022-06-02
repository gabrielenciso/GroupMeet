import React from 'react';
import ReactDOM from 'react-dom/client';
import returnCalendarDaysArr from '../lib/returnCalendarDaysArr.js';
import returnMonthLabels from '../lib/returnMonthLabels.js';
import returnYearLabels from '../lib/returnYearLabels.js';

const date = new Date();
const arrayDates = returnCalendarDaysArr(date);

function CalendarDays(props) {

  const blocks = arrayDates.map((day, index) => {
    const boldToday = (date.getDate() === day.getDate() && date.getMonth() === day.getMonth())
     ? 'font-bold text-xl' : 'font-thin';
    return (
      <div key={index}
        className={`h-12 w-12 font-plus-jakarta-sans ${boldToday} center-all bg-gray-300
                  lg:h-16 lg:w-16`}>
        {day.getDate()}
      </div>
    )
  })

  return (
    <div className='w-11/12 h-64 flex flex-wrap justify-between
                    lg:w-11/12 lg:m-0 lg:h-84'>
      {blocks}
    </div>
  )
}

function CalendarLabelWeek() {
  return (
    <div className='w-11/12 mx-auto px-0 flex flex-wrap justify-around'>
      {
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((val, index) =>
          <div key={index}
            className='h-12 w-12 font-plus-jakarta-sans font-thin center-all'>
            {val}
          </div>
        )
      }
    </div>
  )
}

function CalendarLabelMonth() {

  const months = returnMonthLabels(arrayDates);

  const blocks = months.map((month, index) =>
    <div key={index}
      className='h-12 w-4 text-xxs font-plus-jakarta-sans center-all -rotate-90
                lg:text-xs lg:h-16 xl:rotate-0 xl:flex xl:justify-end'>
      {month}
    </div>
  )

  return (
    <div className='w-4 h-64 flex flex-col justify-around
                    lg:h-84'>
      {blocks}
    </div>
  )
}

function CalendarLabelYear() {

  const years = returnYearLabels(arrayDates);

  const blocks = years.map((year, index) =>
    <div key={index}
      className='h-12 w-4 text-xxs font-plus-jakarta-sans center-all rotate-90
                lg:text-xs lg:h-16 xl:rotate-0 xl:ml-2'>
      {year}
    </div>
  )

  return (
    <div className='w-4 h-64 flex flex-col justify-around
                    lg:h-84'>
      {blocks}
    </div>
  )
}

export default class CreateCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currDay: new Date()
    }
  }

  render() {

    return (
      <>
      <CalendarLabelWeek />
      <div className='flex justify-between'>
        <CalendarLabelMonth />
        <CalendarDays />
        <CalendarLabelYear />
      </div>
      </>
    )
  }
}
