import React from 'react';
import returnCalendarDaysArr from '../lib/return-calendar-days-arr.js';
import returnMonthLabels from '../lib/return-month-labels.js';
import returnYearLabels from '../lib/return-year-labels.js';
import SelectingDaysContext from '../lib/selecting-days-context.js';

class CalendarDays extends React.Component {

  render() {

    const { date, arrayDates } = this.props;
    const { handleMouseDown, handleMouseUp, handleSelectDays, daysSelected } = this.context;

    const blocks = arrayDates.map((day, index) => {
      const color = daysSelected.days.includes(day.toString()) ? 'bg-green-500' : 'bg-gray-300';
      const boldToday = (date.getDate() === day.getDate() && date.getMonth() === day.getMonth())
        ? 'font-bold text-xl'
        : 'font-thin';
      return (
        <div key={index} value={day.toString()} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseOver={handleSelectDays}
          className={`h-12 w-12 font-plus-jakarta-sans ${boldToday} center-all ${color} hover:cursor-pointer
                  lg:h-16 lg:w-16`}>
          {day.getDate()}
        </div>

      );
    });

    return (
      <div className='w-11/12 h-64 flex flex-wrap justify-between
                    lg:w-11/12 lg:m-0 lg:h-84'>
        {blocks}
      </div>
    );
  }
}
CalendarDays.contextType = SelectingDaysContext;

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
  );
}

function CalendarLabelMonth(props) {
  const { arrayDates } = props;
  const months = returnMonthLabels(arrayDates);

  const blocks = months.map((month, index) =>
    <div key={index}
      className='h-12 w-4 text-xxs font-plus-jakarta-sans center-all -rotate-90
                lg:text-xs lg:h-16 xl:rotate-0 xl:flex xl:justify-end'>
      {month}
    </div>
  );

  return (
    <div className='w-4 h-64 flex flex-col justify-around
                    lg:h-84'>
      {blocks}
    </div>
  );
}

function CalendarLabelYear(props) {
  const { arrayDates } = props;
  const years = returnYearLabels(arrayDates);

  const blocks = years.map((year, index) =>
    <div key={index}
      className='h-12 w-4 text-xxs font-plus-jakarta-sans center-all rotate-90
                lg:text-xs lg:h-16 xl:rotate-0 xl:ml-2'>
      {year}
    </div>
  );

  return (
    <div className='w-4 h-64 flex flex-col justify-around
                    lg:h-84'>
      {blocks}
    </div>
  );
}

export default class CreateCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      scrollCount: 0
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    const scrollDirection = event.target.getAttribute('value');
    if (scrollDirection === 'down') {
      this.setState({ scrollCount: this.state.scrollCount + 1 });
    } else {
      this.setState({ scrollCount: this.state.scrollCount - 1 });
    }
  }

  render() {
    const { date, scrollCount } = this.state;

    const arrayDates = returnCalendarDaysArr(date, scrollCount);

    const scrollUp = scrollCount > 0
      ? <i value="up" onClick={this.handleScroll}
        className="fa-solid fa-chevron-up fa-lg hover:cursor-pointer"></i>
      : null;

    return (
      <>
      <div className='w-full h-5 center-all'>
        {scrollUp}
      </div>
      <CalendarLabelWeek />
      <div className='flex justify-between select-none'>
        <CalendarLabelMonth arrayDates={arrayDates} />
        <CalendarDays date={date} arrayDates={arrayDates}/>
        <CalendarLabelYear arrayDates={arrayDates} />
      </div>
      <div className='w-full h-8 center-all'>
          <i value="down" onClick={this.handleScroll}
          className="fa-solid fa-chevron-down fa-lg hover:cursor-pointer"></i>
      </div>
      </>
    );
  }
}

CreateCalendar.contextType = SelectingDaysContext;
