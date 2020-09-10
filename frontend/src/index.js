import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';  
import * as serviceWorker from './tools/serviceWorker';
import getMainPage from './ui/mainPage/mainPage';


class App extends Component {
  constructor(){
    super();
  }

  mainPage(){
    return getMainPage()
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/task_tarcker" component={this.mainPage} />
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
