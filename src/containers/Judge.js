import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getValidataToken } from '../reducer/modules/company';

class Judge extends Component {

  componentDidMount () {
    this.props.actions.getValidataToken()
  }

  render () {
    const user = window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user'))
    const token = this.props.validateToken
    return (
      (user && token) ? (window.location.href = '/app/home') : (window.location.href = '/login')
    )
  }
}

function mapStateToProps (state) {
  const { company } = state
  return {
    validateToken: company.validateToken
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      getValidataToken
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Judge);
