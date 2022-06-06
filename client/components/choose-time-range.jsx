import React from 'react';
import ReactDOM from 'react-dom/client';
import SelectTime from './select-time';

function ChooseTimeLabel() {
  return (
    <h3 className='font-nunito-sans font-thin text-lg mb-5'>
      Choose a Time
    </h3>
  )
}


export default class ChooseTimeRange extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { handleStartTime, handleEndTime } = this.props;
    return (
      <div className='w-full text-center mt-12
                      lg:w-96 lg:order-2'>
        <ChooseTimeLabel />
        <div className='w-4/5 flex justify-between items-center m-auto'>
          <SelectTime getTime={handleStartTime}/>
          <span className='font-nunito-sans font-thin text-lg'>to</span>
          <SelectTime getTime={handleEndTime} />
        </div>
      </div>
    )
  }
}
