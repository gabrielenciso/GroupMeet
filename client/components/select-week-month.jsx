import React from 'react';
import CreateWeek from './create-week.jsx';
import CreateCalendar from './create-calendar.jsx';
import SelectingDaysContext from '../lib/selecting-days-context.js';

function SelectDropDown(props) {
  const { onChange } = props;
  return (
    <div className='w-full text-center mt-8 mb-3'>
      <select onChange={onChange}

        className='select select-ghost w-68 p-1 font-nunito-sans font-light text-xl active:outline-none
      focus:outline-none focus:border-b focus:border-b-blue-500
              lg:w-68'>

        <option value="month">Choose days of the month</option>
        <option value="week">Choose days of the week</option>
      </select>
    </div>
  );
}

class SelectWeekMonth extends React.Component {

  render() {
    const { handleSelectChange, view, handleSelectDays, handleMouseDown, handleMouseUp, handleMouseOut, daysSelected } = this.props;
    // const { daysSelected } = this.state;
    const contextValues = { handleSelectChange, handleSelectDays, handleMouseDown, handleMouseUp, handleMouseOut, daysSelected };

    let selectView;
    if (view === 'week') {
      selectView = (
        <CreateWeek/>
      );
    } else if (view === 'month') {
      selectView = (
        <CreateCalendar />
      );
    }

    return (
      <SelectingDaysContext.Provider value={contextValues}>
        <div className='w-full mx-0 min-h-fit
                        lg:w-128 lg:mt-7 lg:order-4 lg:mx-0'>

            <SelectDropDown onChange={handleSelectChange}/>
            {selectView}
        </div>
      </SelectingDaysContext.Provider>
    );
  }
}

export default SelectWeekMonth;
