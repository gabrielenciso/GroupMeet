import React from 'react'
import ReactDOM from 'react-dom/client'
import SelectingDaysContext from '../lib/selecting-days-context';

export default class CreateWeek extends React.Component {

  render () {
    const { handleMouseDown, handleMouseUp, handleSelectWeekDays, daysSelected } = this.context;

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

    return week;
  }
}

CreateWeek.contextType = SelectingDaysContext;
