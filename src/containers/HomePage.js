import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCompanyList, addCompany, resetAccount } from '../reducer/modules/company';
import HomeTable from '../components/HomeTable';
import AddCoreEnterprise from '../components/AddCoreEnterprise';
import { Input, Button, Table } from 'antd';

import '../css/homepage.scss';

class HomePage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.handleAddOk = this.handleAddOk.bind(this);
    this.handleAddCancel = this.handleAddCancel.bind(this);
  }

  componentDidMount () {
    this.props.actions.getCompanyList()
  }

  showAddModal = () => {
    this.setState({
      show: true
    });
  }
  handleAddOk = (e) => {
    this.setState({
      show: false
    });
  }
  handleAddCancel = (e) => {
    this.setState({
      show: false
    });
  }

  render() {
    return (
      <div className="content-back">
        <h1 className="home-title">后台管理</h1>
        <Button type="primary" onClick={this.showAddModal} className='home-search'>创建核心企业</Button>
        <HomeTable
          companyList={this.props.companyList}
          resetAccount={this.props.actions.resetAccount}
          getCompanyList={this.props.actions.getCompanyList}
        />
        <AddCoreEnterprise
          visible={this.state.show}
          handleOk={this.handleAddOk}
          handleCancel={this.handleAddCancel}
          addCompany={this.props.actions.addCompany}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { company } = state
  return {
    companyList: company.companyList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      getCompanyList,
      addCompany,
      resetAccount
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
