import React from 'react';
import Header from '../components/header';
import MeetingDetails from '../components/event-name-description';
import SelectMonthDates from '../components/select-month-dates';
import ChooseTimeRange from '../components/choose-time-range';
import Button from '../components/button';
import returnTimesArr from '../lib/return-times-arr';
import returnEmptyBlocks from '../lib/return-empty-blocks';

export default class MeetingForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      startTime: {
        hour: '9',
        minute: '0',
        ampm: 'AM'
      },
      endTime: {
        hour: '5',
        minute: '0',
        ampm: 'PM'
      },
      daysSelected: {
        days: []
      },
      toggle: false,
      selecting: false
    };

    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleSelectDays = this.handleSelectDays.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleStartTime(event) {
    const { name, value } = event.target;
    this.setState(prevState => ({
      startTime: {
        ...prevState.startTime,
        [name]: value
      }
    }));
  }

  handleEndTime(event) {
    const { name, value } = event.target;
    this.setState(prevState => ({
      endTime: {
        ...prevState.endTime,
        [name]: value
      }
    }));
  }

  handleSelectDays(event) {
    if (!this.state.toggle) return;

    const selectedVal = event.target.getAttribute('value');
    const days = this.state.daysSelected.days.slice();

    if (this.state.selecting) {
      this.setState({
        daysSelected: {
          days: [...this.state.daysSelected.days, selectedVal]
        }
      });
    } else {
      if (!days.includes(selectedVal)) return;

      days.splice(days.indexOf(selectedVal), 1);
      this.setState({
        daysSelected: {
          days
        }
      });
    }
  }

  handleMouseDown(event) {
    this.setState({ toggle: true });

    const selectedVal = event.target.getAttribute('value');
    const days = this.state.daysSelected.days.slice();

    if (!days.includes(selectedVal)) {
      this.setState({
        daysSelected: {
          days: [...this.state.daysSelected.days, selectedVal]
        },
        selecting: true
      });
    } else {

      days.splice(days.indexOf(selectedVal), 1);
      this.setState({
        daysSelected: {
          days
        },
        selecting: false
      });
    }
  }

  handleMouseUp() {
    this.setState({ toggle: false });
  }

  handleMouseOut() {
    this.setState({ toggle: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { name, description, daysSelected, startTime, endTime } = this.state;

    if (daysSelected.days.length === 0) {
      alert('please select specific days');
      return;
    }

    daysSelected.days.sort((a, b) => {
      const date1 = new Date(a);
      const date2 = new Date(b);
      return date1 - date2;
    });

    const times = returnTimesArr(startTime, endTime);
    const selectedBlocks = returnEmptyBlocks(times, daysSelected);

    const body = { name, description, daysSelected, startTime, endTime, selectedBlocks };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch('/api/meetings', req)
      .then(res => res.json())
      .then(result => {
        const meetingId = result.meetingId;
        window.location.hash = `meetings?meetingId=${meetingId}`;
      })
      .catch(err => console.error(err));
  }

  render() {
    const { handleName, handleDescription, handleStartTime, handleEndTime, handleSelectDays, handleMouseDown, handleMouseUp, handleMouseOut, handleDeselectDays } = this;
    const { name, description, daysSelected } = this.state;
    return (
      <>
      <Header />
      <div className='w-96 m-auto
                      lg:w-4/5 lg:m-auto lg:mt-10'>
        <form onSubmit={this.handleSubmit}>
          <div className='flex flex-wrap
                          lg:flex-col lg:flex-wrap lg:items-center lg:h-144'>
            <MeetingDetails handleName={handleName} handleDescription={handleDescription} nameVal={name} descVal={description}/>
            <SelectMonthDates handleSelectDays={handleSelectDays} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} handleMouseOut={handleMouseOut} handleDeselectDays={handleDeselectDays} daysSelected={daysSelected} />
            <ChooseTimeRange handleStartTime={handleStartTime} handleEndTime={handleEndTime}/>
            <div className='w-full center-all my-20
                            lg:w-96 lg:order-3'>
              <span className='font-nunito-sans font-thin text-lg mr-4'>Ready?</span>
              <Button text='Create Meeting' />
            </div>
          </div>
        </form>
      </div>
      </>
    );
  }
}
