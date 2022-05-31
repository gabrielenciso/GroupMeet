import React from 'react'
import ReactDOM from 'react-dom/client'


function createWeek() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const week = days.map((day, index) =>
    <span key={index} className='h-8 w-8 mx-5'>
      {day}
    </span>
    )

  return (
    {week}
  )
}

class SelectWeekMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      week: true

    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    console.log(event.target.value)
  }

  render() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week = days.map((day, index) =>
      <span key={index} className='h-full w-12 bg-gray-300 font-nunito-sans font-thin center-all
                                  lg:w-16'>
        {day}
      </span>)

    return (
      <div className='w-full mx-5 min-h-fit
                      lg:w-116 lg:mt-10 lg:order-4 lg:mx-0'>
          <div className='w-full text-center mt-8 mb-5'>
            <select onChange={this.handleSelectChange}

              className='select select-ghost w-3/4 p-1 font-nunito-sans font-light text-xl active:outline-none
      focus:outline-none focus:border-b focus:border-b-blue-500
              lg:w-64'>

              <option value={'week'}>Choose days of the week</option>
              <option value={'month'}>Choose days of the month</option>
            </select>
          </div>

          <div className='w-full h-12 flex justify-between
                          lg:h-16'>
            {week}
          </div>
      </div>
    )
  }
}

export default SelectWeekMonth;
