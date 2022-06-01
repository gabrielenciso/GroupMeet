import React from 'react';
import ReactDOM from 'react-dom/client';

function CalendarDays(props) {
  const arr = [];
  arr.length = 35;
  arr.fill(0);

  const blocks = arr.map((val, index) => {
    return (
      <div key={index}
      className='h-12 w-12 font-plus-jakarta-sans font-thin center-all bg-gray-300'>
        {val}
      </div>
    )
  })

  return (
    <div className='w-full h-64 flex flex-wrap justify-between'>
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
      <CalendarDays />
    )
  }
}
