import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';

class SupplierTable extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      selectAll: false,
      willConcat: false,
      dataList: []
    }
    this.getList = this.getList.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.start = this.start.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.isGettingSupplierList && this.props.isGettingSupplierList && nextProps.dataList) {
      let selectedRowKeys = this.state.willConcat ? this.state.selectedRowKeys : []
      const dataList = this.state.willConcat ? this.state.dataList.concat(nextProps.dataList) : nextProps.dataList
      for (let data of nextProps.dataList) {
        if (this.state.selectAll) {
          selectedRowKeys.push(data.connectionId)
        }
      }
      this.setState({
        dataList,
        selectedRowKeys,
        willConcat: false
      })
    }
  }

  handleSelectAll (selected, selectedRows, changeRows) {
    let params = {
      selectAll: selected
    }
    if (!selected) {
      params.selectedRowKeys = []
    } else {
      let selectedRowKeys = []
      console.log(this.state.dataList)
      for (let data of selectedRows) {
        selectedRowKeys.push(data.connectionId)
      }
      params.selectedRowKeys = selectedRowKeys
    }
    console.log(params)
    this.setState(params)
  }

  handleSelection (record, selected, selectedRows) {
    let params = {}
    let selectedRowKeys = this.state.selectedRowKeys
    if (record === 'clear') {
      params.selectedRowKeys = []
    } else {
      if (this.state.selectAll) {
        params.selectAll = false
        params.selectedRowKeys = [record.connectionId]
      } else if (selected) {
        selectedRowKeys.push(record.connectionId)
        params.selectedRowKeys = selectedRowKeys
      } else {
        selectedRowKeys.splice(selectedRowKeys.indexOf(record.connectionId), 1)
        params.selectedRowKeys = selectedRowKeys
      }
    }
    this.setState(params)
  }

  start = () => {
    let data = {
      connectionId: this.state.selectedRowKeys,
      selectAll: this.state.selectAll
    };
    console.log(data);
    this.props.sendSupplierInvitation(data)
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(selectedRows);
    this.setState({
      selectedRowKeys: this.state.selectedRowKeys
     });
    console.log(selectedRowKeys);
  }

  sendEmail = (record) => {
    const data = {
      connectionId: []
    }
    data.connectionId.push(record.connectionId)
    this.props.sendSupplierInvitation(data)
  }

  getList () {
    let headerData = [{
      title: '供应商编号/名称',
      dataIndex: 'supplierCompanyName',
      width: 150,
      render: (text, record, index) => {
        return <Link className='hoverable-link' to={`/connections/detail?connectionId=${record.connectionId}`}>{text}</Link>
      }
    },
    {
      title: '邀请邮箱',
      dataIndex: 'contactEmail',
      width:300
    },
    {
      title: '联系人名称',
      dataIndex: 'contactName',
      width: 100
    },
    {
      title: '联系人电话',
      dataIndex: 'contactPhone',
      width: 150
    },
    {
      title: '状态',
      dataIndex: 'displayStatus',
      width: 100
    },
    {
      title: '操作',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link className='hoverable-link' to={`${window.location.pathname}/detail?connectionId=${record.connectionId}`}>查看</Link>
          <span className="ant-divider" />
          <a onClick={() => this.sendEmail(record)}>重新邀请</a>
          <span className="ant-divider" />
          <Link className='hoverable-link' to='#'>审核</Link>
        </span>
      ),
    }];
    return headerData
  }

  render () {
    const list = this.getList()
    const data = this.props.supplierList && this.props.supplierList.connections
    const { loading, selectedRowKeys,  } = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onSelectAll: this.handleSelectAll,
      onChange: this.onSelectChange,
      onSelect: this.handleSelection
    };
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            邀请
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 个供应商` : ''}
          </span>
        </div>
        <Table
          columns={list}
          dataSource={data}
          bordered={true}
          pagination={false}
          rowKey='connectionId'
          rowSelection={rowSelection}
          scroll={{ y: 'calc(100vh - 400px)' }}
         />
      </div>
    )
  }
}

export default SupplierTable;
