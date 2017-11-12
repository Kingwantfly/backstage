import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Cascader, Col, Form, Input, Modal, Popconfirm, Row } from 'antd';
import 'url-search-params-polyfill';

const FormItem = Form.Item;

class SupplierInfo extends Component {

  constructor (props) {
    super(props);
    this.state = {
      contacts: [],
      options: [],
      editable: false
    }
    this.getOperationButton = this.getOperationButton.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTrashSupplier = this.handleTrashSupplier.bind(this);
  }

  handleEdit (params) {
    let search = new URLSearchParams (window.location.search);
    this.setState({
      editable: params
    })
    if (!params) {
      this.props.getSupplierDetail(this.props.connectionId)
    }
  }

  handleTrashSupplier (value, connectionId) {
      let params = {
        connectionId: connectionId,
        trashed: value
      }
      this.props.actions.updateSupplierManagement(params)
    }

  handleCancel () {
    this.props.form.resetFields()
    let params = []
    params = params.concat(this.props.connection.contacts)
    this.setState({
      contacts: params
    })
    this.handleEdit(false)
  }

  getOperationButton () {
    let operationButton = ''
    let operationButton2 = ''
    const connection = this.props.connection || {}
    if (connection.actions && !this.state.editable) {
      operationButton = connection.actions.indexOf('EDIT') !== -1
      ? (
        <Col span={2} offset={3}>
          <Button type='primary' onClick={() => this.handleEdit(true)}>编辑</Button>
        </Col>
      )
      : ''

      operationButton2 = connection.actions.indexOf('DELETE') !== -1
      ? (
        <Col span={2}>
          <Popconfirm title='确认删除吗？' onConfirm={(e) => this.handleTrashSupplier(true, this.props.connectionId)} okText='删除' cancelText='取消'>
            <Button type='danger'>删除</Button>
          </Popconfirm>
        </Col>
      )
      : ''
    }
    return {
      operationButton, operationButton2
    }
  }

  handleSubmit (e) {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.contacts.length === 0) {
          Modal.error({
            title: '错误',
            content: '请至少添加一个联系人',
            okText: '确定'
          })
          return
        }
        let params = {
          address: values.address,
          accountCityCode: values.bankCity && values.bankCity[1],
          accountProvinceCode: values.bankCity && values.bankCity[0],
          bankAccount: values.bankAccount,
          bankAccountNumber: values.bankAccountNumber,
          bankName: values.bankName,
          cityCode: values.residence[1],
          companyName: values.companyName,
          companyWebsite: values.companyWebsite,
          contacts: this.state.contacts,
          openBranch: values.openBranch,
          paymentTerms: values.paymentTerms,
          provinceCode: values.residence[0],
          supervisorName: values.supervisorName,
          supervisorPhone: values.supervisorPhone
        }
        if (this.props.uploadDoc) {
          params['aduitDetailsMediaId'] = this.props.uploadDoc.mediaId
        }
        if (this.props.connectionId) {
          params.connectionId = this.props.connectionId
          this.props.getSupplierDetail(params)
        } else {
          this.props.createSupplierConnection(params)
        }
      }
    })
  }


  render () {
    console.log(this.props.connection);
    const operationButtonGroup = this.getOperationButton();
    const connection = this.props.connection;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { offset: 1, span: 17 }
    }
    let buttonGroup
    if (this.state.editable) {
      if (this.props.connectionId) {
        buttonGroup = (
          <div>
            <Button size='large' className='edit-button' type='primary' onClick={this.handleSubmit}>确定</Button>
            <Button size='large' className='edit-button' onClick={() => this.handleCancel()}>取消</Button>
          </div>
        )
      }
    }
    console.log(connection.connectionId);
    return (
      <div>
        <Form className='esInventory-form'>
          <Row>
            <Col className='formitem-title-lineheight formitem-title-text' span={2}>
              <h3>基础信息</h3>
            </Col>
            <Col className='formitem-title-lineheight formitem-title-text' span={3}>
              {`供应商编号: ${connection.supplierCompanyNumber}`}
            </Col>
            <Col className='formitem-title-lineheight formitem-title-text' span={5}>
              {`供应商状态: ${connection.displayStatus}`}
            </Col>
            <Col className='formitem-title-lineheight formitem-title-text' span={2}>
              <Link className='hoverable-link' to={`identification?connectionId=${connection.connectionId}`}>认证信息</Link>
            </Col>
            <Col className='formitem-title-lineheight formitem-title-text' span={4}>
              {operationButtonGroup.operationButton}
            </Col>
            <Col className='formitem-title-lineheight formitem-title-text' span={4}>
              {operationButtonGroup.operationButton2}
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label='供应商名称'
            >
              {getFieldDecorator('companyName', {
                initialValue: connection.supplierCompanyName,
                rules: [{
                  required: true,
                  message: '请输入供应商名称'
                }]
              })(
                <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='供应商地址'
            >
              {getFieldDecorator('residence', {
                initialValue: connection.provinceCode ? [connection.provinceCode, connection.cityCode] : null,
                rules: [{
                  type: 'array',
                  required: true,
                  message: '请选择供应商所在城市'
                }]
              })(
                <Cascader disabled={!this.state.editable} options={this.state.options} placeholder='请输入供应商地址' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='联系人'
            >
              {getFieldDecorator('paymentTerms', {
                initialValue: connection.contactName,
                rules: [{
                  required: true,
                  message: '请输入联系人'
                }]
              })(
                <Input  disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} style={{width: '100%'}} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label='公司网址'
              >
              {getFieldDecorator('companyWebsite', {
                initialValue: connection.companyWebsite
              })(
                <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='供应商详细地址'
            >
              {getFieldDecorator('address', {
                initialValue: connection.address,
                rules: [{
                  required: true,
                  message: '请输入供应商详细地址'
                }]
              })(
                <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <div className='formitem-title-lineheight formitem-title-text'>
            <h3>管理员账户</h3>
          </div>
          <Col span={24}>
            <div className='supplier-management-form-block'>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label='邮箱账号'
                  >
                    {getFieldDecorator('contactEmail', {
                      initialValue: connection.contactEmail,
                      rules: [{
                        required: true,
                        message: '请输入管理员邮箱账号'
                      }, {
                        message: '请输入正确的邮箱格式',
                        type: 'email'
                      }]
                    })(
                      <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <div className='formitem-title-lineheight formitem-title-text'>
            <h3>支付方式</h3>
          </div>
          <Col span={24}>
            <div className='supplier-management-form-block'>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label='开户银行'
                  >
                    {getFieldDecorator('bankName', {
                      initialValue: connection.bankName
                    })(
                      <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label='开户城市'
                    >
                    {getFieldDecorator('bankCity', {
                      initialValue: [connection.accountProvinceCode, connection.accountCityCode]
                    })(
                      <Cascader disabled={!this.state.editable} options={this.state.options} placeholder='请选择账户所在城市' />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label='开户账号'
                  >
                    {getFieldDecorator('bankAccountNumber', {
                      initialValue: connection.bankAccountNumber,
                      rules: [{
                        validator: this.checkBankAccount
                      }]
                    })(
                      <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label='开户支行'
                    >
                    {getFieldDecorator('openBranch', {
                      initialValue: connection.openBranch
                    })(
                      <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
                      )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label='开户名'
                    >
                    {getFieldDecorator('bankAccount', {
                      initialValue: connection.bankAccount
                    })(
                      <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
                      )}
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <div className='formitem-title-lineheight formitem-title-text'>
            <h3>内部联系</h3>
          </div>
          <Col span={24}>
            <div className='supplier-management-form-block'>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label='采购负责人'
                  >
                    {getFieldDecorator('supervisorName', {
                      initialValue: connection.supervisorName
                    })(
                      <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label='负责人电话'
                  >
                    {getFieldDecorator('supervisorPhone', {
                      initialValue: connection.supervisorPhone
                    })(
                      <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <div className='formitem-title-lineheight formitem-title-text'>
            <h3>账期</h3>
          </div>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label='默认账期'
            >
              {getFieldDecorator('companyName', {
                initialValue: connection.paymentTerms,
                rules: [{
                  message: '请输入账期'
                }]
              })(
                <Input addonAfter='天' disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
              )}
            </FormItem>
          </Col>
        </Row>
        {
          buttonGroup
          ? (
            <div>
              <div className='form-footer'>
                {buttonGroup}
              </div>
            </div>
          )
          : ''
        }
      </div>
    )
  }
}

export default Form.create()(SupplierInfo);