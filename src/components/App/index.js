/**
 * Import
 */
import React from 'react';
import axios from 'axios';

/**
 * Local import
 */
// Composants

// Styles et assets
import './app.sass';

/**
 * Code
 */
const API_URL = 'https://172.17.0.1/api/v1/web';

class App extends React.Component {
  componentDidMount() {
    console.log('test');
    axios
      // .post('http://192.168.99.100:31883', {
      // trying to work around CORS limitation in Nuclio, using both:
      // - dc up
      // - telepresence --swap-deployment codering-ui --namespace codering --expose 3000:3000 --run-shell
      // as reported by kubectl get service codering-ui --namespace codering
      // but that's no better for the local app is still running from localhost:3000
      .post(`${API_URL}/guest/default/greeting.json`, {
        name: 'jd'
      }, {
        crossDomain: true
      })
      .then(console.log)
      .catch(console.error);
  }

  render() {
    return (
      <div id="app">
        <h1 id="app-title">Codering</h1>
        <p id="app-content">Hello tout le monde !!!</p>
      </div>
    );
  }
};

/**
 * Export
 */
export default App;
