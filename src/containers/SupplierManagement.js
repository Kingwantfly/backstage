import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSupplierList, sendSupplierInvitation } from '../reducer/modules/supplier';
import { getCompanyDetail } from '../reducer/modules/company';
import 'url-search-params-polyfill';
import SupplierTable from '../components/SupplierTable';
import SupplierFilter from '../components/SupplierFilter';
import '../css/homepage.scss';


class SupplierManagement extends Component {

  componentDidMount () {
    let search = new URLSearchParams (window.location.search);
    this.props.actions.getCompanyDetail(search.get('companyId'))
    this.props.actions.getSupplierList(search.get('companyId'))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps === this.props) {
      let search = new URLSearchParams (window.location.search);
      this.props.actions.getCompanyDetail(search.get('companyId'))
      this.props.actions.getSupplierList(search.get('companyId'))
    }
  }

  render () {
    const companyName = this.props.companyName && this.props.companyName.company.companyName
    return (
      <div className="content-back">
        <h1>{companyName}</h1>
        <h2>供应商管理</h2>
        <SupplierFilter
          getSupplierList={this.props.actions.getSupplierList}
        />
        <SupplierTable
          supplierList={this.props.supplierList}
          sendSupplierInvitation={this.props.actions.sendSupplierInvitation}
          isGettingSupplierList={this.props.isGettingSupplierList}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { supplier, company } = state
  return {
    companyName: company.companyDetail,
    supplierList: supplier.supplierList,
    isGettingSupplierList: supplier.isGettingSupplierList
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      getSupplierList,
      getCompanyDetail,
      sendSupplierInvitation
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierManagement);
