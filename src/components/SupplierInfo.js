import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, Input, Modal, Popconfirm, Row } from 'antd';

const FormItem = Form.Item;

class SupplierInfo extends Component {

  constructor (props) {
    super(props);
    this.state = {
      editable: false
    }
    this.getOperationButton = this.getOperationButton.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEdit (params) {
    this.setState({
      editable: params
    })
    if (!params) {
      this.props.getSupplierDetail(this.props.connectionId)
    }
  }

  handleCancel () {
    this.props.form.resetFields()
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
          <Popconfirm title='确认删除吗？' okText='删除' cancelText='取消'>
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
        let params = {
          address: values.address,
          contactName: values.contactName,
          email: values.email,
          accountCityCode: values.accountCityCode,
          bankAccount: values.bankAccount,
          bankAccountNumber: values.bankAccountNumber,
          bankName: values.bankName,
          cityCode: values.cityCode,
          supplierCompanyName: values.supplierCompanyName,
          companyWebsite: values.companyWebsite,
          openBranch: values.openBranch,
          paymentTerms: values.paymentTerms,
          provinceCode: values.province,
          supervisorName: values.supervisorName,
          supervisorPhone: values.supervisorPhone,
          contactPhone: values.contactPhone
        }
        if (this.props.connectionId) {
          params.connectionId = this.props.connectionId
          this.props.changeSupplier(params)
          this.setState({editable: false})
        }
      }
    })
  }


  render () {
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
              {getFieldDecorator('supplierCompanyName', {
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
              {getFieldDecorator('cityCode', {
                initialValue: connection.cityCode,
                rules: [{
                  type: 'string',
                  required: true
                }]
              })(
                <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='联系人'
            >
              {getFieldDecorator('contactName', {
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
            <FormItem
              {...formItemLayout}
              label='联系人电话'
            >
              {getFieldDecorator('contactPhone', {
                initialValue: connection.contactPhone,
                rules: [{
                  required: true,
                  message: '请输入联系人电话'
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
                    {getFieldDecorator('email', {
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
                    {getFieldDecorator('accountCityCode', {
                      initialValue: connection.accountCityCode,
                    })(
                      <Input disabled={!this.state.editable} placeholder={this.state.editable ? '请输入' : ''} />
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
              {getFieldDecorator('paymentTerms', {
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
            <div className="edit-btn">
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
