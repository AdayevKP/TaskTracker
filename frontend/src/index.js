import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';  
import * as serviceWorker from './tools/serviceWorker';
import TaskTracker from './taskTrackerApp/taskTracker'


class App extends Component {
  constructor(){
    super();
    this.taskTarckerApp = new TaskTracker()
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={() => this.taskTarckerApp.ui.render()} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
