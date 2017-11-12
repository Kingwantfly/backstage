import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSupplierDetail } from '../reducer/modules/supplier';
import 'url-search-params-polyfill';
import { Button, Col, Form, Input, Table, Cascader, Row } from 'antd';

const FormItem = Form.Item;

class SuppilerIdentification extends Component {

  constructor (props) {
    super(props);
    this.state = {
      editable: false
    }
  }

  componentDidMount () {
    let search = new URLSearchParams (window.location.search);
    const connectionId = search.get('connectionId');
    this.props.actions.getSupplierDetail(connectionId);
  }

  render () {
    console.log(this.props.SupplierDetail);
    const { getFieldDecorator } = this.props.form;
    const connection = this.props.SupplierDetail && this.props.SupplierDetail.connection || {}
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { offset: 1, span: 17 }
    }
    const columns = [{
      title: '股东姓名',
      dataIndex: 'contactName',
      key: 'contactName',
    }, {
      title: '股东身份证号',
      dataIndex: 'aduitDetailsMediaId',
      key: 'aduitDetailsMediaId'
    }];
    return (
      <div className="content-back">
        <h1>{connection.supplierCompanyName}</h1>
          <h2 className='formitem-title-lineheight formitem-title-text'>联系人信息</h2>
          <FormItem
            {...formItemLayout}
            label='联系人姓名'
          >
            {getFieldDecorator('contactName', {
              initialValue: connection.contactName,
              rules: [{
                required: true,
                message: '请输入联系人姓名'
              }]
            })(
              <Input disabled={true}  />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='联系人职位'
          >
            {getFieldDecorator('contacts', {
              initialValue: connection.contacts,
              rules: [{
                type: 'array',
                required: true
              }]
            })(
              <Cascader disabled={true} options={this.state.options} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='联系人手机'
          >
            {getFieldDecorator('contactPhone', {
              initialValue: connection.contactPhone,
              rules: [{
                required: true
              }]
            })(
              <Input  disabled={true}  style={{width: '100%'}} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='联系人手机'
          >
            {getFieldDecorator('contactEmail', {
              initialValue: connection.contactEmail
            })(
              <Input  disabled={true}  style={{width: '100%'}} />
            )}
          </FormItem>
          <h2 className='formitem-title-lineheight formitem-title-text'>企业信息</h2>
          <FormItem
            {...formItemLayout}
            label='企业执照'
          >
            {getFieldDecorator('contactEmail', {
              initialValue: connection.contactEmail
            })(
              <span>是否三证合一</span>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='统一社会信用证代码'
          >
            {getFieldDecorator('contactEmail', {
              initialValue: connection.aduitDetailsMediaId,
              rules: [{
                required: true
              }]
            })(
              <Input  disabled={true}  style={{width: '100%'}} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='企业组织形式'
          >
            {getFieldDecorator('contactEmail', {
              initialValue: connection.aduitDetailsMediaId,
              rules: [{
                required: true
              }]
            })(
              <Input  disabled={true}  style={{width: '100%'}} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='公司是否上市'
          >
            {getFieldDecorator('contactEmail', {
              initialValue: connection.aduitDetailsMediaId,
              rules: [{
                required: true
              }]
            })(
              <Input  disabled={true}  style={{width: '100%'}} />
            )}
          </FormItem>
          <Row>
            <h2 className='formitem-title-lineheight formitem-title-text'>股东信息（至少填写一个）</h2>
            <Table
              columns={columns}
              dataSource={this.props.connection}
              pagination={false}
              rowKey='index'
            />
          </Row>
          <h2 className='formitem-title-lineheight formitem-title-text'>银行账户信息</h2>
          <FormItem
            {...formItemLayout}
            label='开户银行'
          >
            {getFieldDecorator('bankName', {
              initialValue: connection.bankName,
              rules: [{
                required: true
              }]
            })(
              <Input  disabled={true}  style={{width: '100%'}} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='开户名'
          >
            {getFieldDecorator('bankAccount', {
              initialValue: connection.bankAccount,
              rules: [{
                required: true
              }]
            })(
              <Input  disabled={true}  style={{width: '100%'}} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='开户账号'
          >
            {getFieldDecorator('bankAccountNumber', {
              initialValue: connection.bankAccountNumber,
              rules: [{
                required: true
              }]
            })(
              <Input  disabled={true}  style={{width: '100%'}} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='开户支行'
          >
            {getFieldDecorator('openBranch', {
              initialValue: connection.openBranch,
              rules: [{
                required: true
              }]
            })(
              <Input  disabled={true}  style={{width: '100%'}} />
            )}
          </FormItem>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { supplier } = state
  console.log(supplier);
  return {
    SupplierDetail: supplier.SupplierDetail
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      getSupplierDetail
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SuppilerIdentification));
