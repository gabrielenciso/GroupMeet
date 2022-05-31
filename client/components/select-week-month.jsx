import React from 'react'
import ReactDOM from 'react-dom/client'


function CreateWeek(props) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const week = days.map((day, index) =>
    <span key={index} onClick={props.onClick} data-selected={false}

      className='h-full w-12 bg-gray-300 font-nunito-sans font-thin center-all
                                  lg:w-16'>
      {day}
    </span>)

  return week
}

class SelectWeekMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: true,
      daysSelected: []
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectWeekDays = this.handleSelectWeekDays.bind(this);
  }

  handleSelectChange(event) {
    console.log(event.target.value)
  }

  handleSelectWeekDays(event) {
    console.log(event.target)
  }

  render() {
    // const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // const week = days.map((day, index) =>
    //   <span key={index} onClick={this.handleSelectWeekDays}

    //   className='h-full w-12 bg-gray-300 font-nunito-sans font-thin center-all
    //                               lg:w-16'>
    //     {day}
    //   </span>)
    const { handleSelectChange, handleSelectWeekDays } = this;
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

          <div className='w-full h-12 flex justify-between
                          lg:h-16'>
            <CreateWeek onClick={handleSelectWeekDays} />
          </div>
      </div>
    )
  }
}

export default SelectWeekMonth;
