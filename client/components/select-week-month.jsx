import React from 'react'
import ReactDOM from 'react-dom/client'
import CreateWeek from './create-week.jsx';
import CreateCalendar from './create-calendar.jsx'
import SelectingDaysContext from '../lib/selecting-days-context.js';


function SelectDropDown(props) {
  const { onChange } = props;
  return (
    <div className='w-full text-center mt-8 mb-3'>
      <select onChange={onChange}

        className='select select-ghost w-68 p-1 font-nunito-sans font-light text-xl active:outline-none
      focus:outline-none focus:border-b focus:border-b-blue-500
              lg:w-68'>

        <option value={'week'}>Choose days of the week</option>
        <option value={'month'}>Choose days of the month</option>
      </select>
    </div>
  )
}

class SelectWeekMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'week',
      daysSelected: [],
      toggle: false,
      selecting: false
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectDays = this.handleSelectDays.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleSelectChange(event) {
    this.setState({ view: event.target.value });
    this.setState({ daysSelected: [] });
  }

  handleSelectDays(event) {
    if (!this.state.toggle) return

    const selectedVal = event.target.getAttribute('value');
    const days = this.state.daysSelected.slice();

    if (this.state.selecting) {
      this.setState({ daysSelected: [...this.state.daysSelected, selectedVal]})
    } else {
      if (!days.includes(selectedVal)) return

      days.splice(days.indexOf(selectedVal), 1);
      this.setState({ daysSelected: days});
    }

  }

  handleMouseDown(event) {
    this.setState({ toggle: true });

    const selectedVal = event.target.getAttribute('value');
    const days = this.state.daysSelected.slice();

    if (!days.includes(selectedVal)) {
      this.setState({
        daysSelected: [...this.state.daysSelected, selectedVal],
        selecting: true
      });
    } else {
      days.splice(days.indexOf(selectedVal), 1);
      this.setState({
        daysSelected: days,
        selecting: false
      });
    }
  }

  handleMouseUp() {
    this.setState({ toggle: false })
  }

  handleMouseOut() {
    this.setState({ toggle: false });
  }

  render() {
    const { handleSelectChange, handleSelectDays, handleMouseDown, handleMouseUp, handleMouseOut } = this;
    const { daysSelected } = this.state;
    const contextValues = { handleSelectChange, handleSelectDays, handleMouseDown, handleMouseUp, handleMouseOut, daysSelected };

    let selectView;
    if (this.state.view === 'week') {
      selectView = (
        <CreateWeek/>
      )
    } else if (this.state.view === 'month') {
      selectView = (
        <CreateCalendar />
      )
    }

    return (
      <SelectingDaysContext.Provider value={contextValues}>
        <div className='w-full mx-0 min-h-fit
                        lg:w-128 lg:mt-7 lg:order-4 lg:mx-0'>

            <SelectDropDown onChange={handleSelectChange}/>
            {selectView}
        </div>
      </SelectingDaysContext.Provider>
    )
  }
}

export default SelectWeekMonth;
