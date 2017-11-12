import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import createReducer from './reducer/create';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const store = createReducer();

ReactDOM.render(
  <Provider store={store}>
    <div className="layout-page">
        <App />
    </div>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();

// ReactDOM.render(
//   <Provider store={store}>
//     <Rounter>
//       <MyRoutes />
//     </Rounter>
//   </Provider>, document.getElementById('root')
// );
// registerServiceWorker();
