import React from 'react'
import ReactDOM from 'react-dom/client'


function CreateWeek(props) {
  const {mousedown, mouseup, selecting, selectdays} = props;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const week = days.map((day, index) => {
    const color = selectdays.includes(day) ? 'bg-green-500' : 'bg-gray-300';

    return(
      <span key={index} onMouseDown={mousedown} onMouseUp={mouseup} onMouseOver={selecting} value={day}

        className={`h-full w-12 ${color} font-nunito-sans font-thin center-all hover:cursor-pointer
                                  lg:w-16`}>
        {day}
      </span>
    )
  });

  return week;
}

class SelectWeekMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: true,
      daysSelected: [],
      toggle: false,
      selecting: false
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectWeekDays = this.handleSelectWeekDays.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleSelectChange(event) {
    console.log(event.target.value)
  }

  changeDaysSelected(event) {
    const selectedVal = event.target.getAttribute('value');
    const days = this.state.daysSelected;

    if (!days.includes(selectedVal)) {
      this.setState({ daysSelected: [...this.state.daysSelected, selectedVal],
                       selecting: true });
    } else {
      days.splice(days.indexOf(selectedVal), 1);
      this.setState({ daysSelected: days,
                      selecting: false });
    }
  }
  //hover
  handleSelectWeekDays(event) {
    if (!this.state.toggle) return

    const selectedVal = event.target.getAttribute('value');
    const days = this.state.daysSelected.slice();

    if (this.state.selecting) {
      this.setState({ daysSelected: [...this.state.daysSelected, selectedVal]})
    } else {
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
    // this.changeDaysSelected(event);
  }

  handleMouseUp() {
    this.setState({ toggle: false })
  }

  handleMouseOut() {
    this.setState({ toggle: false });
  }

  render() {
    const { handleSelectChange, handleSelectWeekDays, handleMouseDown, handleMouseUp, handleMouseOut } = this;
    return (
      <div className='w-full mx-5 min-h-fit
                      lg:w-116 lg:mt-10 lg:order-4 lg:mx-0'>
          <div className='w-full text-center mt-8 mb-5'>
            <select onChange={handleSelectChange}

              className='select select-ghost w-3/4 p-1 font-nunito-sans font-light text-xl active:outline-none
      focus:outline-none focus:border-b focus:border-b-blue-500
              lg:w-64'>

              <option value={'week'}>Choose days of the week</option>
              <option value={'month'}>Choose days of the month</option>
            </select>
          </div>

          <div onMouseLeave={handleMouseOut} className='w-full h-12 flex justify-between select-none
                          lg:h-16'>
            <CreateWeek mousedown={handleMouseDown} mouseup={handleMouseUp} selecting={handleSelectWeekDays} selectdays={this.state.daysSelected} />
          </div>
      </div>
    )
  }
}

export default SelectWeekMonth;
