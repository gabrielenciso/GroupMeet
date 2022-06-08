import React from 'react';

export default class SelectTime extends React.Component {

  render() {
    const { getTime } = this.props;
    return (
      <div className="py-1 px-3 w-32 font-nunito-sans bg-white rounded-lg border border-gray-400">
        <div className="flex justify-around">
          <select name="hour" onChange={getTime}
          className="bg-transparent text-xl appearance-none outline-none font-light">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <span className="text-xl mr-3">:</span>
          <select name="minute" onChange={getTime}
          className="bg-transparent text-xl appearance-none outline-none mr-4 font-light">
            <option value="0">00</option>
            <option value="30">30</option>
          </select>
          <select name="ampm" onChange={getTime}
          className="bg-transparent text-xl appearance-none outline-none font-light">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    );
  }
}
