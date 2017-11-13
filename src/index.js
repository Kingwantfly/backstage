import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import MyRoute from './routes/MyRoute';
import registerServiceWorker from './registerServiceWorker';
import createReducer from './reducer/create';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const store = createReducer();

ReactDOM.render(
  <Provider store={store}>
    <div className="layout-page">
        <MyRoute />
    </div>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
