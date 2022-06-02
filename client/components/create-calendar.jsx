import React from 'react';
import ReactDOM from 'react-dom/client';
import returnCalendarDaysArr from '../lib/returnCalendarDaysArr.js';

function CalendarDays(props) {
  arr = returnCalendarDaysArr(new Date());

  const blocks = arr.map((val, index) => {
    return (
      <div key={index}
      className='h-12 w-12 font-plus-jakarta-sans font-thin center-all bg-gray-300
                  lg:h-16 lg:w-16'>
        {val}
      </div>
    )
  })

  return (
    <div className='w-11/12 h-64 flex flex-wrap justify-between m-auto
                    lg:w-full lg:m-0 lg:h-84'>
      {blocks}
    </div>
  )
}

function CalendarLabelWeek() {
  return (
    <div className='w-full px-4 flex flex-wrap justify-between'>
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
      <div className='flex'>
        <div className='w-auto h-64 border'></div>
        <CalendarDays />
        <div className='w-auto h-64 border'></div>
      </div>
      </>
    )
  }
}
