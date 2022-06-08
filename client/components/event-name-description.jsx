import React from 'react';

class MeetingDetails extends React.Component {

  render() {
    const { handleName, handleDescription, nameVal, descVal } = this.props;

    return (
      <div className='w-full px-11
                      lg:w-96 lg:order-1'>
        <input placeholder="New Meeting Event" type="text" name="meetingName" value={nameVal} onChange={handleName}

          className='border-b border-b-gray-500 w-full mt-10 mb-8 text-center font-nunito-sans text-2xl font-thin active:outline-none
          focus:outline-none focus:border-b-blue-500 focus:border-b'/>

        <textarea placeholder="add description" name="meetingDescription" value={descVal} onChange={handleDescription}

          className='border border-gray-500 w-full h-28 font-nunito-sans font-thin resize-none p-1 active:outline-none
          focus:outline-none focus:border focus:border-blue-500'/>

      </div>
    );
  }

}

export default MeetingDetails;
