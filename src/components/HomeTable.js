import React, { Component } from 'react';
import { Input, Table, Form } from 'antd';
import { Link } from 'react-router-dom';
import ResetManager from './ResetManager';

const FormItem = Form.Item;

class HomeTable extends Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      record: {}
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.getList = this.getList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal = (record) => {
    this.setState({
      visible: true,
      record
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = `search=${values.search}`
        this.props.getCompanyList(data);
      }
    });
  }

  getList () {
    let headerData = [{
      title: '核心企业',
      dataIndex: 'companyName',
      className: 'content-table',
      render: (text, record, index) => {
        return <Link className='hoverable-link' to={`/app/companies/detail?companyId=${record.companyId}`}>{text}</Link>
      }
    },
    {
      title: '管理员账户',
      dataIndex: 'contactEmail',
      className: 'content-table',
    },
    {
      title: '供应商数',
      dataIndex: 'connectionCount',
      className: 'content-table',
    },
    {
      title: '操作',
      key: 'action',
      className: 'content-table',
      render: (text, record) => (
        <span>
          <a onClick={() => this.showModal(record)}>重置管理员登录密码</a>
          <span className="ant-divider" />
          <Link className='hoverable-link' to={`/app/connections?companyId=${record.companyId}`}>管理</Link>
        </span>
      ),
    }];
    return headerData
  }

  render() {
    const list = this.getList()
    const data = this.props.companyList && this.props.companyList.companies
    const pagination = {
      total: (this.props.companyList && this.props.companyList.count) || 0,
      pageSize: 10,
      defaultCurrent: 1
    }

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
      <div className="layout-content">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
          >
            {getFieldDecorator('search', {
              rules: [{ required: true}]
            })(
              <Input type="search"  className="content-search"/>
            )}
          </FormItem>
        </Form>
        <Table
          columns={list}
          dataSource={data}
          bordered={true}
          pagination={pagination}
         />
         <ResetManager
           record={this.state.record}
           visible={this.state.visible}
           handleOk={this.handleOk}
           handleCancel={this.handleCancel}
           resetAccount={this.props.resetAccount}
         />
      </div>
    )
  }
}

export default Form.create()(HomeTable);
