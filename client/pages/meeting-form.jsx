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
      startTime: '',
      endTime: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };

    fetch('/api/meeting', req)
      .then(res => res.json())
      .then(result => {
        console.log('result: ', result)
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
      <Header />
      <div className='w-96 m-auto
                      lg:w-4/5 lg:m-auto lg:mt-10'>
        <form onSubmit={this.handleSubmit}>
          <div className='flex flex-wrap
                          lg:flex-col lg:flex-wrap lg:items-center lg:h-144'>
            <MeetingDetails />
            <SelectWeekMonth />
            <ChooseTimeRange />
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
