import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';  
import * as serviceWorker from './tools/serviceWorker';
import TaskTracker from './taskTrackerApp/taskTracker'
import AuthComponent from './auth/authUi'
 
/*
class App extends Component {
  checkAuthorization(func){
    if (this.authorized) {
      return func;
    } else {
      return (..._) => (<Redirect to='/login' />);
    }
  }

  taskTrackerComponent(){
    return this.checkAuthorization(this.taskTarckerApp.ui.render)()
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path={this.taskTarckerApp.path} component={this.taskTrackerComponent} />
          <Route exact path={this.auth.path} component={this.auth.ui.render} />
        </div>
      </Router>
    );
  }
}
*/
class App extends Component{
    render() {
        return (
        <Router>
            <Route path='/login'>
                <AuthComponent/>
            </Route>
        </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

serviceWorker.unregister()
