import React from 'react';
import CreateCalendar from './create-calendar.jsx';
import SelectingDaysContext from '../lib/selecting-days-context.js';

class SelectMonthDates extends React.Component {

  render() {
    const { handleSelectDays, handleMouseDown, handleMouseUp, handleMouseOut, daysSelected } = this.props;
    const contextValues = { handleSelectDays, handleMouseDown, handleMouseUp, handleMouseOut, daysSelected };

    return (
      <SelectingDaysContext.Provider value={contextValues}>
        <div className='w-full mx-0 min-h-fit
                        lg:w-128 lg:mt-7 lg:order-4 lg:mx-0'>

          <div className='w-full center-all mt-8 mb-3'>
            <h2 className='w-68 p-1 font-nunito-sans font-light text-xl text-center
              active:outline-none focus:outline-none focus:border-b focus:border-b-blue-500
              lg:w-68'>

                Choose days of the month
            </h2>
          </div>
          <CreateCalendar />
        </div>
      </SelectingDaysContext.Provider>
    );
  }
}

export default SelectMonthDates;
