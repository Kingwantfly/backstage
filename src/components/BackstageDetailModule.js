import React, { Component } from 'react';
import { Modal, Button, Form, Switch, Input } from 'antd';
import { putAccountState } from '../reducer/modules/company';
import 'url-search-params-polyfill';

const FormItem = Form.Item;

class BackstageDetailModule extends Component {

  constructor (props) {
    super(props);
    this.state = {
      showAccount: false,
      showSupplier: false,
      showBasic: false
    }
  }

  showAccountModal = () => {
    this.setState({
      showAccount: true
    });
  }
  handleAccountOk = (e) => {
    console.log(this.props.location);
    let queryId = new URLSearchParams (this.props.location.search)
    let companyId = queryId.get('companyId')
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.companyId = companyId
        this.props.putAccountState(values);
      }
      this.setState({
        showAccount: false
      });
    });
  }
  handleAccountCancel = (e) => {
    this.setState({
      showAccount: false
    });
  }

  showSupplierModal = () => {
    this.setState({
      showSupplier: true
    });
  }
  handleSupplierOk = (e) => {
    let queryId = new URLSearchParams (this.props.location.search)
    let companyId = queryId.get('companyId')
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.companyId = companyId
        this.props.putSupplierState(values);
      }
      this.setState({
        showSupplier: false
      });
    });
  }
  handleSupplierCancel = (e) => {
    this.setState({
      showSupplier: false
    });
  }

  showBasicModal = () => {
    this.setState({
      showBasic: true
    });
  }
  handleBasicOk = (e) => {
    let queryId = new URLSearchParams (this.props.location.search)
    let companyId = queryId.get('companyId')
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
        values.companyId = companyId
        this.props.putBasicState(values);
      }
      this.setState({
        showBasic: false
      });
    });
  }
  handleBasicCancel = (e) => {
    this.setState({
      showBasic: false
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const itemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
    };
    return (
      <div>
        <Form>
          <FormItem
            {...itemLayout}
          >
            <div>
              <h2>模块管理</h2>
              <h3>必选</h3>
            </div>
          </FormItem>
          <FormItem
            {...itemLayout}
            label="基础设置"
          >
            <Button type="primary" size='small' onClick={this.showBasicModal}>设置</Button>
          </FormItem>
          <FormItem
            {...itemLayout}
            label="供应商管理"
          >
            <Button type="primary" size='small' onClick={this.showSupplierModal}>设置</Button>
          </FormItem>
          <FormItem
            {...itemLayout}
            label="发票管理"
          >
            <Button type="primary" size='small'>设置</Button>
          </FormItem>
          <FormItem
            {...itemLayout}
            label="付款管理"
          >
            <Button type="primary" size='small'>设置</Button>
          </FormItem>
          <FormItem
            {...itemLayout}
            label="灵活账期（以发票管理为前提）"
          >
            <Button type="primary" size='small' onClick={this.showAccountModal}>设置</Button>
          </FormItem>
        </Form>
        <Modal
          visible={this.state.showAccount}
          onOk={this.handleAccountOk}
          onCancel={this.handleAccountCancel}
          maskClosable={false}
        >
          <h2>灵活账期设置</h2>
          <Form>
            <FormItem
              {...itemLayout}
              label="开启浮动年化利率模式"
            >
              {getFieldDecorator('enableFloatApr',  { valuePropName: 'checked' })(
                <Switch />
              )}
            </FormItem>
          </Form>
        </Modal>
        <Modal
          visible={this.state.showSupplier}
          onOk={this.handleSupplierOk}
          onCancel={this.handleSupplierCancel}
          maskClosable={false}
        >
          <h2>供应商管理</h2>
          <Form>
            <FormItem
              {...itemLayout}
              label="是否使用供应商风险管理"
            >
              {getFieldDecorator('enableRiskManagement',  { valuePropName: 'checked' })(
                <Switch />
              )}
            </FormItem>
          </Form>
        </Modal>
        <Modal
          visible={this.state.showBasic}
          onOk={this.handleBasicOk}
          onCancel={this.handleBasicCancel}
          maskClosable={false}
        >
          <h2>基础设置</h2>
          <Form>
            <FormItem
              {...itemLayout}
              label="提前付款多级审核流程设置"
            >
              {getFieldDecorator('processType',  { valuePropName: 'checked' })(
                <div className="modules-rank"><Input type="processType" className="modules-value"/><span>级</span></div>
              )}
            </FormItem>
            <FormItem
              {...itemLayout}
              label="供应商修改多级审核流程设置"
            >
              {getFieldDecorator('connectionProcessType',  { valuePropName: 'checked' })(
                <div className="modules-rank"><Input type="connectionProcessType" className="modules-value"/><span>级</span></div>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(BackstageDetailModule);
