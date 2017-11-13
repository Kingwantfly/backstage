import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class User extends Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['loginAccount', 'password'], (err, values) => {
      if (!err) {
        const data = {
          loginAccount: values.loginAccount,
          password: values.password
        }
        console.log(data);
        this.props.login(data);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-page">
        <div className="login-container">
          <img src="//cdn.redshift.cc/web/util/logo.png" alt="北京红移科技有限公司" className="login-logo" />
          <div className="login-title">欢迎登录供应链金融管理后台系统</div>
          <div className="login-form-container">
            <div className="login-title-name">登录</div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('loginAccount', {
                  rules: [{ required: true, message: '请输入你的用户名!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                <div className="login-help">
                  <a className="login-form-forgot" onClick={this.showModal}>忘记密码？</a>
                  <a href="">注册</a>
                </div>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large">登录</Button>
              </FormItem>
            </Form>
          </div>
        </div>
        <div className='login-footer'>
            Powered by Redshift © 2016 北京红移科技有限公司 京ICP备16043646号-1
        </div>
      </div>
    );
  }
}

const UserLogin = Form.create()(User);
export default UserLogin;
