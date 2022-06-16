import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.handleBackToForm = this.handleBackToForm.bind(this);
  }

  handleBackToForm() {
    window.location.hash = '';
  }

  render() {
    const { handleBackToForm } = this;
    return (
      <>
        <header>
          <h1 onClick={handleBackToForm}
          className='text-blue-500 text-3xl p-3 font-nunito-sans font-light w-96 m-auto select-none hover:cursor-pointer
        lg:w-4/5 lg:m-auto'>
            GroupMeet
          </h1>
          <hr className='border-gray-300' />
        </header>
      </>
    );
  }
}
