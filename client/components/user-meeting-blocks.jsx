import React from 'react';
import returnTimesArr from '../lib/returnTimesArr';
import fillSelectSquare from '../lib/fillSelectSquare';
import fillGroupBlocks from '../lib/fillGroupBlocks';
import some from 'lodash/some';

export default class UserMeetingBlocks extends React.Component {

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
      },
      isAuthorizing: true
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  componentDidMount() {
    const { route, user } = this.props;
    const meetingId = route.params.get('meetingId');
    const userId = user.userId;

    fetch(`/api/users/${userId}/meetingId/${meetingId}`)
      .then(res => res.json())
      .then(user => {
        const { selectedTimes } = user;
        this.setState({
          blocks: selectedTimes
        });
      })
      .catch(err => console.error(err));

  }

  componentDidUpdate() {
    const { route, user, groupBlocks } = this.props;
    const { blocks } = this.state;
    const meetingId = route.params.get('meetingId');
    const userId = user.userId;

    const filledGroupBlocks = fillGroupBlocks(userId, blocks, groupBlocks);
    const group = {
      blocks: filledGroupBlocks
    };

    const body = { meetingId, blocks, group };
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

    const col = event.target.getAttribute('col');
    const row = event.target.getAttribute('row');
    const block = { col, row };
    const { selected } = this.state.blocks;

    this.setState({
      toggle: true,
      fill: {
        init: block
      }
    });

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

    if (this.state.selecting && some(selected, block)) return;

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
      const filtered = selected.filter(val => !some(fill, val));

      this.setState({
        blocks: {
          selected: filtered
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
        <div className='flex overflow-x-scroll select-none lg:order-2'>
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
