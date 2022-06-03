import React from 'react';
import ReactDOM from 'react-dom/client';
import SelectTime from './select-time';

function ChooseTimeLabel() {
  return (
    <h3 className='font-nunito-sans font-thin text-lg mb-5'>
      Choose a Time
    </h3>
  )
}


export default class ChooseTimeRange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timeStart: {
        hour: '1',
        minute: '0',
        ampm: 'AM'
      },
      timeEnd: {
        hour: '1',
        minute: '0',
        ampm: 'AM'
      }
    }

    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
  }

  handleStartTime(event) {
    const { timeStart } = this.state;
    const name = event.target.name;
    if (name === 'hour') {
      this.setState(prevState => ({
        timeStart: {
          ...prevState.timeStart,
          hour: event.target.value
        }
      }));
    } else if (name === 'minute') {
      this.setState(prevState => ({
        timeStart: {
          ...prevState.timeStart,
          minute: event.target.value
        }
      }));
    } else if (name === 'ampm') {
      this.setState(prevState => ({
        timeStart: {
          ...prevState.timeStart,
          ampm: event.target.value
        }
      }));
    }
  }


  handleEndTime(event) {
    const { timeEnd } = this.state;
    const name = event.target.name;
    if (name === 'hour') {
      this.setState(prevState => ({
        timeEnd: {
          ...prevState.timeEnd,
          hour: event.target.value
        }
      }));
    } else if (name === 'minute') {
      this.setState(prevState => ({
        timeEnd: {
          ...prevState.timeEnd,
          minute: event.target.value
        }
      }));
    } else if (name === 'ampm') {
      this.setState(prevState => ({
        timeEnd: {
          ...prevState.timeEnd,
          ampm: event.target.value
        }
      }));
    }
  }

  render() {
    const { handleStartTime, handleEndTime } = this;
    return (
      <div className='w-full text-center mt-12
                      lg:w-96 lg:order-2'>
        <ChooseTimeLabel />
        <div className='w-4/5 flex justify-between items-center m-auto'>
          <SelectTime getTime={handleStartTime}/>
          <span className='font-nunito-sans font-thin text-lg'>to</span>
          <SelectTime getTime={handleEndTime} />
        </div>
      </div>
    )
  }
}
