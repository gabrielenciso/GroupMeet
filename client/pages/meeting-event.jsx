import React from 'react';
import jwtDecode from 'jwt-decode';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';
import UserMeetingBlocks from '../components/user-meeting-blocks.jsx';
import GroupMeetingBlocks from '../components/group-meeting-blocks.jsx';

function MeetingTitle(props) {
  return (
    <div className='w-full px-ll text-center
                    lg:pl-10 lg:order-1 lg:text-left'>
      <h1 className='font-nunito-sans text-3xl font-thin mt-8'>
        {props.name}
      </h1>
      <p className='font-nunito-sans text-sm font-thin text-gray-500 mt-5 mb-10'>
        {props.description}
      </p>
    </div>
  );
}

function RegistrationForm(props) {
  const { handleRegistration, handleUserName, handleSignIn, handleSignInOrRegister, registering } = props;

  let text = {
    label: 'Register as new member',
    button: 'Register',
    pTag: 'Returning?',
    aTag: 'Sign in'
  };

  if (!registering) {
    text = {
      label: 'Sign in as returning member',
      button: 'Sign in',
      pTag: 'new?',
      aTag: 'Register'
    };
  }

  const { label, button, pTag, aTag } = text;
  const onSubmit = registering ? handleRegistration : handleSignIn;
  return (
    <div className='mt-10 text-center w-3/4 m-auto
                    lg:w-96 lg:order-2'>
      <form onSubmit={onSubmit}>
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
        <Button text={button}/>
        <p className='font-nunito-sans font-light text-xs mt-5'>
          {pTag}
        </p>
        <a onClick={handleSignInOrRegister}
        className='font-nunito-sans font-normal text-blue-500 hover:cursor-pointer'>
          {aTag}
        </a>
      </form>
    </div>
  );
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
      isAuthorizing: true,
      selectedBlocks: {
        blocks: []
      },
      registering: true
    };

    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleValidUser = this.handleValidUser.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSignInOrRegister = this.handleSignInOrRegister.bind(this);
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

  componentWillUnmount() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  handleRegistration(event) {
    event.preventDefault();

    const { username } = this.state;
    const { route } = this.props;
    const meetingId = route.params.get('meetingId');
    const blocks = {
      selected: []
    };
    const body = { username, meetingId, blocks };
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
          this.handleValidUser(result);
        }
      });
  }

  handleUserName(event) {
    this.setState({ username: event.target.value });
  }

  handleSignInOrRegister() {
    this.setState({ registering: !this.state.registering });
  }

  handleValidUser(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignIn(event) {
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

    fetch('/api/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {

          alert(result.error);
        } else {
          const { selectedTimes } = result.user;
          this.setState({
            blocks: selectedTimes
          });
          this.handleValidUser(result);
        }

      })
      .catch(err => console.error(err));
  }

  handleSignOut(event) {
    event.preventDefault();
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  render() {
    if (this.state.isAuthorizing) return null;

    const { name, description, dates, startTime, endTime, user, selectedBlocks, registering } = this.state;
    const { handleRegistration, handleUserName, handleSignIn, handleSignOut, handleSignInOrRegister } = this;

    const signOut = user
      ? <input type='submit' name='signout' value='Sign Out' onClick={handleSignOut}
      className='font-nunito-sans font-light text-blue-500 w-full lg:pl-5 lg:order-3 hover:cursor-pointer' />
      : null;

    const userView = user
      ? <UserMeetingBlocks dates={dates} startTime={startTime} endTime={endTime} route={this.props.route} user={user} groupBlocks={selectedBlocks} />
      : <RegistrationForm handleUserName={handleUserName} handleRegistration={handleRegistration} handleSignIn={handleSignIn} handleSignInOrRegister={handleSignInOrRegister} registering={registering} />;
    return (
      <>
        <Header />
        <div className='min-w-96 m-auto flex flex-wrap justify-center
                        lg:w-4/5 lg:m-auto lg:mt-5'>
          <div className='w-96 flex flex-wrap justify-center lg:w-1/2 lg:h-116'>
            <MeetingTitle name={name} description={description} />
            {userView}
            {signOut}
          </div>
          <div className='w-full lg:w-1/2 text-center flex flex-wrap justify-center'>
            <h1 className='font-nunito-sans text-xl font-thin mt-10 w-full'>
              Group&apos;s Availability
            </h1>
            <h3 className='font-nunito-sans mt-4 mb-10 w-full'>
              0 registered
            </h3>
            <GroupMeetingBlocks dates={dates} startTime={startTime} endTime={endTime} groupBlocks={selectedBlocks} route={this.props.route} user={user}/>
          </div>
        </div>
      </>
    );
  }
}
