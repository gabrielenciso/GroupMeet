import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from '../components/header.jsx';

function MeetingTitle(props) {
  return (
    <>
      <h1 className='font-nunito-sans text-xl font-normal'>
        {props.name}
      </h1>
      <p className='font-nunito-sans text-sm font-thin text-gray-400'>
        {props.description}
      </p>
    </>
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
        <MeetingTitle name={name} description={description}/>
      </>

      // name and description from data base
      // registration form
      // group availability
      // table made from data base
    )
  }
}
