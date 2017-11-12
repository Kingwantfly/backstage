import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class ResetManager extends Component {

  constructor (props) {
    super(props);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(['buyerCompanyId', 'email', 'password'], (err, values) => {
      if (!err) {
        const data = {
          buyerCompanyId: this.props.record.companyId,
          email: this.props.record.contactEmail,
          password: values.password
        }
        this.props.resetAccount(data);
        this.props.handleOk();
      } else {
        console.log(values);
        this.setState({confirmDirty: false})
      }
    });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value.match(/^[0-9A-Za-z]{6,}$/) && !!value) {
      form.validateFields(['confirmAccount'], { force: true });
      callback();
    } else {
      callback('密码由数字和字母组合，且长度不少于6位');
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return (
      <div>
        <Modal
          title="重置管理员登录密码"
          visible={this.props.visible}
          onOk={this.handleSubmit}
          onCancel={this.props.handleCancel}
          maskClosable={false}
          closable={false}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="原账号"
              hasFeedback
            >
              <span>{this.props.record.contactEmail}</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码"
              hasFeedback
              help="密码由数字和字母组合，且长度不少于6位。"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入新密码!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="请再次输入密码"
              hasFeedback
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '请确认密码!',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ResetManager);
