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
          <div className='p-3 w-96 m-auto select-none lg:w-4/5'>
            <h1 onClick={handleBackToForm}
              className='text-blue-500 text-3xl font-nunito-sans font-light hover:cursor-pointer w-fit'>
              GroupMeet
            </h1>
          </div>
          <hr className='border-gray-300' />
        </header>
      </>
    );
  }
}
