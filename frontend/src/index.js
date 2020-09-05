import ReactDOM from 'react-dom';
import * as serviceWorker from './tools/serviceWorker';
import getMainPage from './ui/mainPage';

ReactDOM.render(
  getMainPage(),
  document.getElementById('root')
);

serviceWorker.unregister();
