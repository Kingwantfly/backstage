import React, { Component } from 'react';
import {  BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import LayoutSide from '../components/LayoutSide';
import '../css/layout.scss';
import MyRoutes from '../routes/route';

const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
            <LayoutSide />
            <Content>
              <MyRoutes />
            </Content>
          </Layout>
      </Router>
    );
  }
}

export default App;
