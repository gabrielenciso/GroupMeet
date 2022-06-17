import React from 'react';
import SelectTimeStart from './select-time-start';
import SelectTimeEnd from './select-time-end';

function ChooseTimeLabel() {
  return (
    <h3 className='font-nunito-sans font-thin text-lg mb-5'>
      Choose a Time
    </h3>
  );
}

export default class ChooseTimeRange extends React.Component {

  render() {
    const { handleStartTime, handleEndTime } = this.props;
    return (
      <div className='w-full text-center mt-12
                      lg:w-96 lg:order-2'>
        <ChooseTimeLabel />
        <div className='w-4/5 flex justify-between items-center m-auto'>
          <SelectTimeStart getTime={handleStartTime}/>
          <span className='font-nunito-sans font-thin text-lg'>to</span>
          <SelectTimeEnd getTime={handleEndTime} />
        </div>
      </div>
    );
  }
}
