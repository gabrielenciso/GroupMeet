import React from 'react'
import ReactDOM from 'react-dom/client'
import SelectingDaysContext from '../lib/selecting-days-context';

export default class CreateWeek extends React.Component {

  render () {
    const { handleMouseDown, handleMouseUp, handleMouseOut, handleSelectWeekDays, daysSelected } = this.context;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week = days.map((day, index) => {
      const color = daysSelected.includes(day) ? 'bg-green-500' : 'bg-gray-300';

      return (
        <span key={index} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseOver={handleSelectWeekDays} value={day}

          className={`h-full w-12 ${color} font-nunito-sans font-thin center-all hover:cursor-pointer
                                  lg:w-16`}>
          {day}
        </span>
      )
    });

    return (
      <div onMouseLeave={handleMouseOut} className='w-full px-4 h-12 flex justify-between select-none
                          lg:h-16 lg:px-6'>
            {week}
      </div>
    )
  }
}

CreateWeek.contextType = SelectingDaysContext;
