import React, { Component } from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

export default class LayoutSide extends Component {

  render() {
    const user = window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user'))
    const companyName = user && user.company && user.company.companyName
    const username = user && user.username
    const menu = (
      <Menu>
        <Menu.Item>
          <Link className='hoverable-link' to={`/login`} onClick={()=> window.localStorage.clear()}>登出</Link>
        </Menu.Item>
      </Menu>
    );
    if (!user) {
      window.location.href =  '/login'
    }

    return (
      <Sider className="layout-side">
        <div className="top-header">
          <h2 className="top-title">{companyName}</h2>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#" className="top-user">
              用户名：{username}
            </a>
          </Dropdown>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="link-to"><Link to='/app/home'><span className="link-color">核心企业管理</span></Link></span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="upload" />
            <span className="link-to"><Link to='/app/home'><span className="link-color">发票导入管理</span></Link></span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="video-camera" />
            <span className="link-to"><Link to='/app/home'><span className="link-color">银行卡认证打款</span></Link></span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

LayoutSide.__ANT_LAYOUT_SIDER = true;
