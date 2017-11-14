import React, { Component } from 'react';
import { Button, Form} from 'antd';
import { Link } from 'react-router-dom';
import ResetManager from './ResetManager';
import 'url-search-params-polyfill';

const FormItem = Form.Item;

class BackstageDetailBasic extends Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: false
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  }

  render () {
    const invoiceAmount = this.props.companyDetail.invoiceSummary && this.props.companyDetail.invoiceSummary.invoiceAmount
    const overtimePayAmount = this.props.companyDetail.invoiceSummary && this.props.companyDetail.invoiceSummary.overtimePayAmount
    const connectionCount = this.props.companyDetail.connectionSummary && this.props.companyDetail.connectionSummary.connectionCount
    const regConnectionCount = this.props.companyDetail.connectionSummary && this.props.companyDetail.connectionSummary.regConnectionCount
    let search = new URLSearchParams (window.location.search);
    let companyId = search.get('companyId')
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    return (
      <div>
        <Form>
          <FormItem
            {...formItemLayout}
          >
            <h2>使用情况</h2>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="当前应付发票金额"
          >
            <span>{invoiceAmount}</span><Button type="primary" className="basic-btn">管理发票</Button>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="逾期付款金额"
          >
            <span>{overtimePayAmount}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="供应商数"
          >
            <span>{connectionCount}</span>
            <Button type="primary" className="basic-btn">
              <Link className='hoverable-link' to={`/app/connections?companyId=${companyId}`}>管理供应商</Link>
            </Button>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="注册供应商数"
          >
            <span>{regConnectionCount}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
          >
            <h2>资料管理</h2>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="管理员账号"
          >
            <span>{this.props.companyDetail.contactEmail}</span><Button type="primary" onClick={this.showModal} className="basic-btn">重置管理员账号</Button>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="管理员姓名"
          >
            <span>{this.props.companyDetail.contactName}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="管理员手机"
          >
            <span>{this.props.companyDetail.contactPhone}</span>
          </FormItem>
        </Form>
        <ResetManager
          record={this.props.companyDetail}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          resetAccount={this.props.resetAccount}
        />
      </div>
    )
  }
}

export default Form.create()(BackstageDetailBasic);
