import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from '../components/header.jsx';
import Button from '../components/button.jsx';

function MeetingTitle(props) {
  return (
    <div className='w-full px-ll text-center
                    lg:w-96 lg:order-1 lg:text-left lg:pl-5'>
      <h1 className='font-nunito-sans text-3xl font-thin mt-8'>
        {props.name}
      </h1>
      <p className='font-nunito-sans text-sm font-thin text-gray-500 mt-5'>
        {props.description}
      </p>
    </div>
  )
}

function RegistrationForm(props) {
  return (
    <div className='mt-10 text-center w-3/4 m-auto
                    lg:w-96 lg:order-2'>
      <form>
        <label htmlFor='username' className='font-nunito-sans font-light text-lg'>
          {props.label}
        </label>
        <input
          required
          id='username'
          type='text'
          name='username'
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

export default class MeetingEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      dates: [],
      startTime: '',
      endTime: ''
    }
  }

  componentDidMount() {
    const route = this.props.route;
    const meetingId = route.params.get('meetingId');
    console.log(meetingId);

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

  render() {
    const { name, description } = this.state;
    return(
      <>
        <Header />
        <div className='w-96 m-auto flex flex-wrap
                        lg:w-4/5 lg:m-auto lg:mt-5'>
          <div className='lg:w-1/2 lg:h-116'>
            <MeetingTitle name={name} description={description} />
            <RegistrationForm label={'Register as a participant'} />
          </div>
          <div className='w-full lg:w-1/2 text-center'>
            <h1 className='font-nunito-sans text-xl font-thin mt-10'>Group's Availability</h1>
            <h3 className='font-nunito-sans mt-4'>0 registered</h3>
          </div>
        </div>
      </>

      // name and description from data base
      // registration form
      // group availability
      // table made from data base
    )
  }
}
