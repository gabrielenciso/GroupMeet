import React from 'react';
import MeetingForm from './pages/meeting-form';
import MeetingEvent from './pages/meeting-event';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <MeetingForm />;
    } else {
      return <MeetingEvent route={route}/>;
    }
  }

  render() {
    return (
      this.renderPage()
    );
  }
}
