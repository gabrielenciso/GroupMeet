import React from 'react';
import HelloWorld from '../components/hello-world';
import Header from '../components/header';
import MeetingDetails from '../components/event-name-description'
import SelectWeekMonth from '../components/select-week-month';
import ChooseTimeRange from '../components/choose-time-range';
import Button from '../components/button';

export default class MeetingForm extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      name: '',
      description: '',
      days: [],
      timeStart: {
        hour: '1',
        minute: '0',
        ampm: 'AM'
      },
      timeEnd: {
        hour: '1',
        minute: '0',
        ampm: 'AM'
      },
      daysSelected: [],
      view: 'month',
      toggle: false,
      selecting: false
    }

    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectDays = this.handleSelectDays.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleDeselectDays = this.handleDeselectDays.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event) {
    this.setState({ name: event.target.value })
  }

  handleDescription(event) {
    this.setState({ description: event.target.value })
  }

  handleStartTime(event) {
    const { startTime } = this.state;
    const { name, value } = event.target;
    this.setState(prevState => ({
      startTime: {
        ...prevState.startTime,
        [name]: value
      }
    }));
  }

  handleEndTime(event) {
    const { endTime } = this.state;
    const { name, value } = event.target;
    this.setState(prevState => ({
      endTime: {
        ...prevState.endTime,
        [name]: value
      }
    }));
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
      this.setState({ daysSelected: [...this.state.daysSelected, selectedVal] })
    } else {
      if (!days.includes(selectedVal)) return

      days.splice(days.indexOf(selectedVal), 1);
      this.setState({ daysSelected: days });
    }
  }

  handleDeselectDays(event) {
    const selectedVal = event.target.getAttribute('value');
    const days = this.state.daysSelected.slice();


    console.log('out');
    console.log(event.target);
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

  handleSubmit(event) {
    event.preventDefault();
    console.log('submitted');

    const { name, description, daysSelected, startTime, endTime } = this.state;
    const body = { name, description, daysSelected, startTime, endTime };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch('/api/meeting', req)
      .then(res => res.json())
      .then(result => {
        console.log('result: ', result)
      })
      .catch(err => console.error(err));
  }

  render() {
    const { handleName, handleDescription, handleStartTime, handleEndTime, handleSelectChange, handleSelectDays, handleMouseDown, handleMouseUp, handleMouseOut, handleDeselectDays } = this;
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
            <SelectWeekMonth handleSelectDays={handleSelectDays} handleSelectChange={handleSelectChange} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} handleMouseOut={handleMouseOut} handleDeselectDays={handleDeselectDays} daysSelected={daysSelected} />
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
    )
  }

}
