import React from 'react';
import MeetingForm from './pages/meeting-form';
import MeetingEvent from './pages/meeting-event';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  handleBacktoForm() {
    window.location.hash = '';
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route, user } = this.state;
    if (route.path === '') {
      return <MeetingForm />;
    } else {
      return <MeetingEvent user={user} route={route}/>;
    }
  }

  render() {

    return (this.renderPage());
  }
}
