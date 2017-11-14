import React from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import LayoutSide from '../components/LayoutSide';
import '../css/layout.scss';
import routes from '../routes/index';
const { Content } = Layout;

const RouteWithSubRoutes = (route) => {
  return (
  <Route path={route.path} exact={route.exact} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)}

const App = ({ routes }) => {
  return (
    <Layout>
      <LayoutSide />
      <Content>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </Content>
    </Layout>
  )
}

export default App;
