import React from 'react';
import ReactDOM from 'react-dom/client';

class MeetingDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
    console.log(event.target.value);
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value })
    console.log(event.target.value);
  }

  render() {
    return (
      <div className='w-full px-11
                      lg:w-96 lg:order-1'>
        <input placeholder="New Meeting Event" type="text" name="meetingName" value={this.state.name} onChange={this.handleNameChange}

          className='border-b border-b-gray-500 w-full mt-10 mb-8 text-center font-nunito-sans text-2xl font-thin active:outline-none
          focus:outline-none focus:border-b-blue-500 focus:border-b'/>

        <textarea placeholder="add description" name="meetingDescription" value={this.state.description} onChange={this.handleDescriptionChange}

          className='border border-gray-500 w-full h-28 font-nunito-sans font-thin resize-none p-1 active:outline-none
          focus:outline-none focus:border focus:border-blue-500'/>

      </div>
    )
  }

}

export default MeetingDetails;
