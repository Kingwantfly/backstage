import React, { Component } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export default class TopHeader extends Component {

  render () {
    const user = JSON.parse(window.localStorage.getItem('user'))

    const menu = (
      <Menu>
        <Menu.Item>
          <Link className='hoverable-link' to={`/login`}>登出</Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className="top-header">
        <span className="top-title">{user.company.companyName}</span>
        <Dropdown overlay={menu}>
         <a className="ant-dropdown-link" href="#" className="top-user">
           用户名：{user.username}
         </a>
       </Dropdown>
      </Header>
    )
  }
}
