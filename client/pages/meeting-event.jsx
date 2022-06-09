import React from 'react';
import jwtDecode from 'jwt-decode';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';
import returnTimesArr from '../lib/returnTimesArr.js';
import fillSelectSquare from '../lib/fillSelectSquare.js';
// const isEqual = require('lodash/isEqual');
const some = require('lodash/some');

function MeetingTitle(props) {
  return (
    <div className='w-full px-ll text-center
                    lg:w-96 lg:order-1 lg:text-left lg:pl-5'>
      <h1 className='font-nunito-sans text-3xl font-thin mt-8'>
        {props.name}
      </h1>
      <p className='font-nunito-sans text-sm font-thin text-gray-500 mt-5 mb-4'>
        {props.description}
      </p>
    </div>
  );
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
        <Button text="Register"/>
        <p className='font-nunito-sans font-light text-xs mt-5'>
          Returning?
        </p>
        <a className='font-nunito-sans font-normal text-blue-500 hover:cursor-pointer'>
          Sign in
        </a>
      </form>
    </div>
  );
}

class GroupMeetingBlocks extends React.Component {

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
          <div key={j} time={times[i]} date={days[j]} col={j} row={i}
            className='h-3 w-14 bg-gray-100 mr-0.5'></div>
        );
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
    });

    const timeLabels = hours.map(hour => {
      return (
        <div key={hour} className='font-plus-jakarta-sans text-xxs font-light'>
          {hour}
        </div>
      );
    });

    const dateLabels = days.map(day => {
      const dayArr = day.split(' ');

      return (
        <div key={day} className='w-14 text-center font-plus-jakarta-sans'>
          <div className='text-xs'>
            { [dayArr[1], dayArr[2]].join(' ') }
          </div>
          <div className='text-base'>
            { dayArr[0][0] }
          </div>
        </div>
      );
    });

    return (
      <>
      <div className='flex overflow-x-scroll'>
        <div className='flex flex-col w-10 justify-between mt-20 mb-10 mx-1'>
          {timeLabels}
        </div>
        <div className='my-10 mr-10 w-min flex flex-wrap justify-center'>
            <div className='w-full flex justify-around'>
              {dateLabels}
            </div>
          {blocks}
        </div>
      </div>
      </>
    );
  }
}

class UserMeetingBlocks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blocks: {
        selected: []
      },
      selecting: false,
      toggle: false,
      fill: {
        init: null
      }
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  componentDidUpdate() {
    // do fetch post request to send the state array to user id in meeting
    const { route, user } = this.props;
    const { blocks } = this.state;
    const meetingId = route.params.get('meetingId');
    const userId = user.userId;

    const body = { meetingId, blocks };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch(`/api/users/${userId}`, req)
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  handleMouseDown(event) {
    this.setState({
      toggle: true
    });

    const col = event.target.getAttribute('col');
    const row = event.target.getAttribute('row');
    const block = { col, row };
    const { selected } = this.state.blocks;

    this.setState(prevState => ({
      fill: {
        ...prevState.fill,
        init: block
      }
    }));

    if (!some(selected, block)) {
      this.setState({
        blocks: {
          selected: [...this.state.blocks.selected, block]
        },
        selecting: true
      });
    } else {
      const removeIndex = selected.findIndex(val => {
        return val.col === block.col && val.row === block.row;
      });
      selected.splice(removeIndex, 1);
      this.setState({
        blocks: {
          selected
        },
        selecting: false
      });
    }
  }

  handleMouseUp(event) {
    this.setState({ toggle: false });
  }

  handleMouseEnter(event) {
    if (!this.state.toggle) return;

    const col = event.target.getAttribute('col');
    const row = event.target.getAttribute('row');
    const block = { col, row };
    const { selected } = this.state.blocks;

    if (this.state.selecting && some(selected, block)) return; // block already selected

    const { init } = this.state.fill;
    let fill = [];
    if (this.state.selecting) {

      fill = fillSelectSquare(init, block).filter(val => !some(selected, val));
      this.setState({
        blocks: {
          selected: [...this.state.blocks.selected, ...fill]
        }
      });
    } else if (!this.state.selecting) {
      if (!some(selected, block)) return;

      fill = fillSelectSquare(init, block);
      const removed = selected.filter(val => !some(fill, val));

      this.setState({
        blocks: {
          selected: removed
        }
      });
    }
  }

  render() {
    const { handleMouseDown, handleMouseUp, handleMouseEnter } = this;
    const { selected } = this.state.blocks;

    const { dates, startTime, endTime } = this.props;
    if (dates.length === 0) return;
    const days = JSON.parse(dates).days;
    const times = returnTimesArr(startTime, endTime);

    const rows = [];
    for (let i = 0; i < times.length - 1; i++) {

      const row = [];
      for (let j = 0; j < days.length; j++) {

        let color = 'bg-gray-300';
        for (let k = 0; k < selected.length; k++) {

          if (selected[k].row === i.toString() && selected[k].col === j.toString()) {
            color = 'bg-green-500';
            break;
          }

        }

        const block = (
          <div key={j} time={times[i]} date={days[j]} col={j} row={i} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseEnter={handleMouseEnter}
            className={`h-3 w-14 ${color} mr-0.5`}></div>
        );
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
    });

    const timeLabels = hours.map(hour => {
      return (
        <div key={hour} className='font-plus-jakarta-sans text-xxs font-light'>
          {hour}
        </div>
      );
    });

    const dateLabels = days.map(day => {
      const dayArr = day.split(' ');

      return (
        <div key={day} className='w-14 text-center font-plus-jakarta-sans'>
          <div className='text-xs'>
            {[dayArr[1], dayArr[2]].join(' ')}
          </div>
          <div className='text-base'>
            {dayArr[0][0]}
          </div>
        </div>
      );
    });

    return (
      <>
        <div className='flex justify-center overflow-x-scroll select-none'>
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
    );
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
      user: null,
      isAuthorizing: true
    };

    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
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

    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleRegistration(event) {
    event.preventDefault();

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
    };

    fetch('/api/users', req)
      .then(res => res.json())
      .then(result => {

        if (result.error) {
          alert('username is already taken');
        } else {
          this.handleSignIn(result);
          this.setState({ signIn: true });
        }
      });
  }

  handleUserName(event) {
    this.setState({ username: event.target.value });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut(event) {
    event.preventDefault();
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  render() {
    if (this.state.isAuthorizing) return null;

    const { name, description, dates, startTime, endTime, user } = this.state;
    const { handleRegistration, handleUserName, handleSignOut } = this;

    const signOut = user
      ? <input type='submit' name='signout' value='Sign Out' onClick={handleSignOut}
      className='font-nunito-sans font-light text-blue-500 lg:pl-5' />
      : null;

    const userView = user
      ? <UserMeetingBlocks dates={dates} startTime={startTime} endTime={endTime} route={this.props.route} user={user} />
      : <RegistrationForm handleUserName={handleUserName} handleRegistration={handleRegistration} label="Register as a participant" />;
    return (
      <>
        <Header />
        <div className='min-w-96 m-auto flex flex-wrap justify-center
                        lg:w-4/5 lg:m-auto lg:mt-5'>
          <div className='w-96 lg:w-1/2 lg:h-116'>
            <MeetingTitle name={name} description={description} />
            {signOut}
            {userView}
          </div>
          <div className='w-full lg:w-1/2 text-center flex flex-wrap justify-center'>
            <h1 className='font-nunito-sans text-xl font-thin mt-10 w-full'>
              Group&apos;s Availability
            </h1>
            <h3 className='font-nunito-sans mt-4 mb-10 w-full'>
              0 registered
            </h3>
            <GroupMeetingBlocks dates={dates} startTime={startTime} endTime={endTime} />
          </div>
        </div>
      </>
    );
  }
}
