import React, { Component } from 'react';
import { Form, Radio, Button, Input } from 'antd';
import 'url-search-params-polyfill';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class SupplierFilter extends Component {

  handleSearch = (e) => {
    let search = new URLSearchParams (window.location.search);
    const buyerCompanyId = search.get("companyId");
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.search) {
        const data = `${buyerCompanyId}&search=${values.search}&status=${values.status}`
        this.props.getSupplierList(data);
      } else {
        const data = `${buyerCompanyId}&status=${values.status}`
        this.props.getSupplierList(data);
      }
    });
  }

  handleReset = () => {
    let search = new URLSearchParams (window.location.search);
    const buyerCompanyId = search.get("companyId");
    this.props.getSupplierList(buyerCompanyId);
    this.props.form.resetFields();
  }

  render () {

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
        <Form onSubmit={this.handleSearch}>
          <FormItem
            {...formItemLayout}
            label="供应商编号/名称"
          >
            {getFieldDecorator('search')(
              <Input type="search" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="供应商状态"
          >
            {getFieldDecorator('status')(
            <RadioGroup>
              <Radio value="UNREGISTERED">未准入</Radio>
              <Radio value="REJECTED">未邀请</Radio>
              <Radio value="INVITED">已邀请</Radio>
              <Radio value="WAIT_AUDIT">待审核</Radio>
              <Radio value="REGISTERED">已注册</Radio>
            </RadioGroup>
          )}
         </FormItem>
           <div className="filter-btn"><Button type="primary" onClick={this.handleSearch}>确定</Button><Button type="primary" onClick={this.handleReset} >取消</Button></div>
        </Form>
      </div>
    )
  }
}

export default Form.create()(SupplierFilter);
