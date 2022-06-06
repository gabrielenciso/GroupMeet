import React from 'react';
import MeetingForm from './pages/meeting-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // route: parseRoute(window.location.hash)
    }
  }

  // componentDidMount() {
  //   window.addEventListener('hashchange', () => {
  //     this.setState({
  //       route: parseRoute(window.location.hash)
  //     });
  //   });
  // }

  // renderPage() {
  //   const { path } = this.state.route;
  //   if (path === '') {
  //     return <MeetingForm />;
  //   } else {

  //   }
  // }

  render() {
    return <MeetingForm />;
  }
}
