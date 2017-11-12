import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs } from 'antd';
import BackstageDetailBasic from '../components/BackstageDetailBasic';
import BackstageDetailModule from '../components/BackstageDetailModule'
import { getCompanyDetail, putAccountState, putSupplierState, putBasicState, resetAccount } from '../reducer/modules/company';
import 'url-search-params-polyfill';
import '../css/homepage.scss';

const TabPane = Tabs.TabPane;

class BackstageDetail extends Component {

  componentDidMount () {
    let companyId = new URLSearchParams (this.props.location.search)
    this.props.actions.getCompanyDetail(companyId.get('companyId'))
  }

  render () {
    const companyDetail = this.props.companyDetail && this.props.companyDetail.company || {}
    return(
      <div className="content-back">
        <h1>{companyDetail.companyName}</h1>
        <Tabs defaultActiveKey="basic">
          <TabPane tab="基础设置" key="basic">
            <BackstageDetailBasic
              companyDetail={companyDetail}
              resetAccount={this.props.actions.resetAccount}
            />
          </TabPane>
          <TabPane tab="模块管理" key="module">
            <BackstageDetailModule
              location={this.props.location}
              putAccountState={this.props.actions.putAccountState}
              putSupplierState={this.props.actions.putSupplierState}
              putBasicState={this.props.actions.putBasicState}
            />
          </TabPane>
          <TabPane tab="企业设置" key="company">企业设置</TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { company } = state
  return {
    companyDetail: company.companyDetail
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      getCompanyDetail,
      putAccountState,
      putSupplierState,
      putBasicState,
      resetAccount
    },dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackstageDetail);
// export default BackstageDetail;
