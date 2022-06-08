import React from 'react';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';
import returnTimesArr from '../lib/returnTimesArr.js'

function MeetingTitle(props) {
  return (
    <div className='w-full px-ll text-center
                    lg:w-96 lg:order-1 lg:text-left lg:pl-5'>
      <h1 className='font-nunito-sans text-3xl font-thin mt-8'>
        {props.name}
      </h1>
      <p className='font-nunito-sans text-sm font-thin text-gray-500 mt-5 mb-10'>
        {props.description}
      </p>
    </div>
  )
}

function RegistrationForm(props) {
  const { handleRegistration, handleUserName, label } = props;
  return (
    <div className='mt-10 text-center w-3/4 m-auto
                    lg:w-96 lg:order-2'>
      <form onSubmit={handleRegistration}>
        <label htmlFor='username' className='font-nunito-sans font-light text-lg'>
          {label}
        </label>
        <input
          required
          id='username'
          type='text'
          name='username'
          onChange={handleUserName}
          className='border border-gray-500 w-4/5 h-10 text-center font-nunito-sans font-thin text-lg mt-3 mb-10
      focus:border-blue-500 focus:border focus:outline-none active:outline-none'
        />
        <Button text={'Register'}/>
        <p className='font-nunito-sans font-light text-xs mt-5'>
          Returning?
        </p>
        <a className='font-nunito-sans font-normal text-blue-500 hover:cursor-pointer'>
          Sign in
        </a>
      </form>
    </div>
  )
}

class GroupMeetingBlocks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dates, startTime, endTime } = this.props;
    if (dates.length === 0) return;

    const days = JSON.parse(dates).days;
    const times = returnTimesArr(startTime, endTime);

    const rows = [];
    for (let i = 0; i < times.length - 1; i++) {
      const row = [];
      for (let j = 0; j < days.length; j++) {
        const block = (
          <div time={times[i]} date={days[j]} key={j}
            className='h-3 w-14 bg-gray-300 mr-0.5'></div>
        )
        row.push(block);
      }
      rows.push(row);
    }

    const blocks = rows.map((row, index) =>
      <div key={index} className='blocks flex justify-center'>
        {row}
      </div>
    );

    const hours = times.filter(time => {
      for (let i = 0; i < time.length; i++) {
        if (time[i] === ':') {
          if (time[i+1] === '0' && time[i+2] === '0'){
            return true;
          }
        }
      }
      return false;
    })

    const timeLabels = hours.map(hour => {
      return (
        <div key={hour} className='font-plus-jakarta-sans text-xxs font-light'>
          {hour}
        </div>
      )
    });

    const dateLabels = days.map(day => {
      const dayArr = day.split(' ');

      return (
        <div key={day} className='text-center font-plus-jakarta-sans'>
          <div className='text-xs'>
            { [dayArr[1], dayArr[2]].join(' ') }
          </div>
          <div className='text-base'>
            { dayArr[0][0] }
          </div>
        </div>
      )
    })

    return(
      <>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-between mt-20 mb-10 mr-1'>
          {timeLabels}
        </div>
        <div className='my-10 w-min flex flex-wrap justify-center'>
            <div className='w-full flex justify-around'>
              {dateLabels}
            </div>
          {blocks}
        </div>
      </div>
      </>
    )
  }
}

class UserMeetingBlocks extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { dates, startTime, endTime } = this.props;
    if (dates.length === 0) return;

    const days = JSON.parse(dates).days;
    const times = returnTimesArr(startTime, endTime);

    const rows = [];
    for (let i = 0; i < times.length - 1; i++) {
      const row = [];
      for (let j = 0; j < days.length; j++) {
        const block = (
          <div time={times[i]} date={days[j]} key={j}
            className='h-3 w-14 bg-gray-300 mr-0.5'></div>
        )
        row.push(block);
      }
      rows.push(row);
    }

    const blocks = rows.map((row, index) =>
      <div key={index} className='blocks flex justify-center'>
        {row}
      </div>
    );

    const hours = times.filter(time => {
      for (let i = 0; i < time.length; i++) {
        if (time[i] === ':') {
          if (time[i + 1] === '0' && time[i + 2] === '0') {
            return true;
          }
        }
      }
      return false;
    })

    const timeLabels = hours.map(hour => {
      return (
        <div key={hour} className='font-plus-jakarta-sans text-xxs font-light'>
          {hour}
        </div>
      )
    });

    const dateLabels = days.map(day => {
      const dayArr = day.split(' ');

      return (
        <div key={day} className='text-center font-plus-jakarta-sans'>
          <div className='text-xs'>
            {[dayArr[1], dayArr[2]].join(' ')}
          </div>
          <div className='text-base'>
            {dayArr[0][0]}
          </div>
        </div>
      )
    })

    return (
      <>
        <div className='flex justify-center'>
          <div className='flex flex-col justify-between mt-20 mb-10 mr-1'>
            {timeLabels}
          </div>
          <div className='my-10 w-min flex flex-wrap justify-center'>
            <div className='w-full flex justify-around'>
              {dateLabels}
            </div>
            {blocks}
          </div>
        </div>
      </>
    )
  }
}

export default class MeetingEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      dates: [],
      startTime: '',
      endTime: '',
      username: '',
      signIn: false
    }

    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
  }

  componentDidMount() {
    const route = this.props.route;
    const meetingId = route.params.get('meetingId');

    fetch(`api/meetings/${meetingId}`)
      .then(res => res.json())
      .then(meeting => {
        const { name, description, dates, startTime, endTime, selectedBlocks } = meeting;
        this.setState({
          name,
          description,
          dates,
          startTime,
          endTime,
          selectedBlocks
        });
      })
      .catch(err => console.error(err));
  }

  handleRegistration(event) {
    event.preventDefault();
    console.log(event.target);

    const { username } = this.state;
    const { route } = this.props;
    const meetingId = route.params.get('meetingId');
    const body = { username, meetingId };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    fetch('/api/users', req)
      .then(res => res.json())
      .then(result => {
        console.log('result: ', result);

        if (result.error) {
          alert('username is already taken');
        } else {
          this.setState({ signIn: true });
        }
      })
  }

  handleUserName(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    const { name, description, dates, startTime, endTime, signIn } = this.state;
    const { handleRegistration, handleUserName } = this;

    const userView = signIn ? <UserMeetingBlocks dates={dates} startTime={startTime} endTime={endTime}/>
    :
      <RegistrationForm handleUserName={handleUserName} handleRegistration={handleRegistration} label={'Register as a participant'} />
    return(
      <>
        <Header />
        <div className='w-96 m-auto flex flex-wrap
                        lg:w-4/5 lg:m-auto lg:mt-5'>
          <div className='lg:w-1/2 lg:h-116'>
            <MeetingTitle name={name} description={description} />
            {userView}
          </div>
          <div className='w-full lg:w-1/2 text-center'>
            <h1 className='font-nunito-sans text-xl font-thin mt-10'>
              Group's Availability
            </h1>
            <h3 className='font-nunito-sans mt-4 mb-10'>
              0 registered
            </h3>
            <GroupMeetingBlocks dates={dates} startTime={startTime} endTime={endTime} />
          </div>
        </div>
      </>
    )
  }
}
