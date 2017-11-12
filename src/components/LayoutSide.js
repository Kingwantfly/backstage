import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

export default class LayoutSide extends Component {
  
  render() {
    return (
      <Sider className="layout-side">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="link-to"><Link to='/'><span className="link-color">核心企业管理</span></Link></span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="upload" />
            <span className="link-to"><Link to='/'><span className="link-color">发票导入管理</span></Link></span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="video-camera" />
            <span className="link-to"><Link to='/'><span className="link-color">银行卡认证打款</span></Link></span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

LayoutSide.__ANT_LAYOUT_SIDER = true;
