import React, { Component } from 'react';
import { Modal, Form, Input, Switch } from 'antd';

const FormItem = Form.Item;

class AddCoreEnterprise extends Component {

  constructor (props) {
    super(props);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        switch (values.processType) {
          case "1":
            values.processType = 'AUDIT_1'
            break;
          case "2":
            values.processType = 'AUDIT_2'
            break;
          case "3":
            values.processType = 'AUDIT_3'
            break;
          case "4":
            values.processType = 'AUDIT_4'
            break;
          case "5":
            values.processType = 'AUDIT_5'
            break;
          default:
          values.processType = 'NOT_AUDIT'
        }
        switch (values.connectionProcessType) {
          case "1":
            values.connectionProcessType = 'AUDIT_1'
            break;
          case "2":
            values.connectionProcessType = 'AUDIT_2'
            break;
          case "3":
            values.connectionProcessType = 'AUDIT_3'
            break;
          case "4":
            values.connectionProcessType = 'AUDIT_4'
            break;
          case "5":
            values.connectionProcessType = 'AUDIT_5'
            break;
          default:
          values.connectionProcessType = 'NOT_AUDIT'
        }
        this.props.addCompany(values);
        this.props.handleOk();
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
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    return (
      <div>
        <Modal
          visible={this.props.visible}
          onOk={this.handleSubmit}
          onCancel={this.props.handleCancel}
          maskClosable={false}
          okText='保存'
        >
          <h2>核心企业信息</h2>
          <Form>
            <FormItem
              {...formItemLayout}
              label="核心企业名称"
              hasFeedback
            >
              {getFieldDecorator('companyName', {
                rules: [{
                  required: true, message: '请输入公司名称!',
                }],
              })(
                <Input type="companyName" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="管理员账号"
              hasFeedback
            >
              {getFieldDecorator('contactEmail', {
                rules: [{
                  required: true, message: '请输入管理员账号!',
                }],
              })(
                <Input type="contactEmail" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="管理员密码"
              hasFeedback
              help="密码由数字和字母组合，且长度不少于6位。"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="请输入管理员姓名"
              hasFeedback
            >
              {getFieldDecorator('contactName', {
                rules: [{
                  required: true, message: '请输入管理员姓名!',
                }],
              })(
                <Input type="contactName" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="请输入管理员手机"
              hasFeedback
            >
              {getFieldDecorator('contactPhone', {
                rules: [{
                  required: true, message: '请输入管理员手机!',
                }],
              })(
                <Input type="contactPhone" />
              )}
            </FormItem>
            <FormItem
            >
              <h2>核心企业模块设置</h2>
              <h3>基础设置</h3>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="提前付款多级审核流程设置"
            >
              {getFieldDecorator('processType',  { valuePropName: 'checked' })(
                <div className="modules-rank"><Input type="processType" className="modules-value"/><span>级</span></div>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="供应商修改多级审核流程设置"
            >
              {getFieldDecorator('connectionProcessType',  { valuePropName: 'checked' })(
                <div className="modules-rank"><Input type="connectionProcessType" className="modules-value"/><span>级</span></div>
              )}
            </FormItem>
            <FormItem
            >
              <h3>供应商管理</h3>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否使用供应商风险管理"
            >
              {getFieldDecorator('enableRiskManagement',  { valuePropName: 'checked' })(
                <Switch />
              )}
            </FormItem>
            <FormItem
            >
              <h3>灵活账期</h3>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="开启浮动年化利率模式"
            >
              {getFieldDecorator('enableFloatApr',  { valuePropName: 'checked' })(
                <Switch />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AddCoreEnterprise);
