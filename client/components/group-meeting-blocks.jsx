import React from 'react';
import returnTimesArr from '../lib/return-times-arr';
import { io } from 'socket.io-client';

export default class GroupMeetingBlocks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupBlocks: {
        selected: []
      },
      isAuthorizing: true
    };

    const { route } = this.props;
    const meetingId = route.params.get('meetingId');
    this.socket = io('/meetings', {
      query: {
        meetingId
      }
    });
  }

  componentDidMount() {
    const { route } = this.props;
    const meetingId = route.params.get('meetingId');

    fetch(`/api/meetings/${meetingId}`)
      .then(res => res.json())
      .then(result => {

        const blocks = result.selectedBlocks.blocks;
        this.setState({
          groupBlocks: {
            selected: blocks
          }
        });
      })
      .catch(err => console.error(err));

    this.socket.on('update', meeting => {

      if (meeting.selectedBlocks) {
        const blocks = meeting.selectedBlocks.blocks;
        this.setState({
          groupBlocks: {
            selected: blocks
          }
        });
      }

    });

    this.setState({ isAuthorizing: false });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    if (this.state.isAuthorizing) return null;

    const { dates, startTime, endTime } = this.props;
    if (dates.length === 0) return;

    const days = JSON.parse(dates).days;
    const times = returnTimesArr(startTime, endTime);

    const { selected } = this.state.groupBlocks;
    if (selected.length === 0) return null;

    let largestArrLength = 0;
    for (let i = 0; i < selected.length; i++) {
      for (let j = 0; j < selected[i].length; j++) {
        const current = selected[i][j];
        if (current.length > largestArrLength) {
          largestArrLength = current.length;
        }
      }
    }

    const rows = [];
    for (let i = 0; i < times.length - 1; i++) {
      const row = [];
      for (let j = 0; j < days.length; j++) {

        let color = 'bg-gray-100';
        let opacityVal = 1;
        if (selected[i][j].length > 0) {
          color = 'bg-green-500';
          opacityVal = ((1 / largestArrLength) * selected[i][j].length).toFixed(2);
        }

        const users = selected[i][j].join(',');
        const block = (
          <div key={j} time={times[i]} date={days[j]} col={j} row={i} users={users}
            className={`h-3 w-14 mr-0.5 ${color}`} style={{ opacity: opacityVal }}></div>
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
