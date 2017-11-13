import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Login from '../containers/Login';
import HomePage from '../containers/HomePage';
import BackstageDetail from '../containers/BackstageDetail';
import SupplierManagement from '../containers/SupplierManagement';
import SupplierDetail from '../containers/SupplierDetail';
import SuppilerIdentification from '../components/SuppilerIdentification';
import App from '../containers/App'
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} exact={route.exact} render={props => {
    return (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes}/>
    );
  }}/>
)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: App,
    routes: [{
        path: '/home',
        component: HomePage
      },{
        path: '/companies/:id',
        component: BackstageDetail
      },{
        path: '/connections',
        component: SupplierManagement,
        exact: true
      },{
        path: '/connections/detail',
        component: SupplierDetail
      },{
        path: '/connections/identification',
        component: SuppilerIdentification
      }
    ]
  }
]

export default class MyRoutes extends Component {
  render() {
    return routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))
  }
}
