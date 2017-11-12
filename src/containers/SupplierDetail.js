import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSupplierDetail } from '../reducer/modules/supplier';
import SupplierInfo from '../components/SupplierInfo';
import 'url-search-params-polyfill';
import { Tabs } from 'antd';
import 'url-search-params-polyfill';

const TabPane = Tabs.TabPane;

class SupplierDetail extends Component {

  componentDidMount () {
    console.log(this.props.location);
    let search = new URLSearchParams (this.props.location.search);
    const connectionId = search.get('connectionId');
    this.props.actions.getSupplierDetail(connectionId);
  }

  render () {
    let search = new URLSearchParams (window.location.search);
    const connectionId = search.get('connectionId');
    const connection = this.props.SupplierDetail && this.props.SupplierDetail.connection || {}
    return (
      <div className="content-back">
        <h1>{connection.supplierCompanyName}</h1>
        <Tabs defaultActiveKey="basic">
          <TabPane tab="供应商信息详情" key="basic">
            <SupplierInfo
              connection={connection}
              getSupplierDetail={this.props.actions.getSupplierDetail}
              connectionId={connectionId}
            />
          </TabPane>
          <TabPane tab="供应关系数据" key="company">供应关系数据</TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { supplier } = state
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDetail);
