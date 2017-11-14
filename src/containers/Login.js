import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserLogin from '../components/UserLogin';
import { login } from '../reducer/modules/user';

require('../css/login.scss')

class Login extends Component {

  render () {
    const user = window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      window.location.href = './app/home'
    }
    return (
      <div>
        <UserLogin
          loginState={this.props.loginState}
          login={this.props.actions.login}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    error: state.user.error,
    loginState: state.user.isLogin
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      login
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
