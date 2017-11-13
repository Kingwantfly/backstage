import fetchCreator from '../../utils/fetchCreator';
// Actions
const REQUEST_LOGIN_USER = 'user/REQUEST_LOGIN_USER';
const SUCCESS_LOGIN_USER = 'user/SUCCESS_LOGIN_USER';
const ERROR_LOGIN_USER = 'user/ERROR_LOGIN_USER';
// Reducer user

const initialState = {
    loginState: false
};

function loginProgress (val) {
  window.localStorage.setItem('token', val.token)
  window.localStorage.setItem('user', JSON.stringify(val.user))
  window.localStorage.setItem('permissions', JSON.stringify(val.user.permissions))
  window.localStorage.setItem('theme', val.user.theme)
  window.location.href='/home'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_USER:
      return Object.assign({}, state, {
        loginState: true
    })
    case SUCCESS_LOGIN_USER:
      return Object.assign({}, state, {
        loginState: true
    })
    case ERROR_LOGIN_USER:
      return Object.assign({}, state, {
        error: action.err,
        loginState: false
    })
    default: {
      return state;
    }
  }
};


function requestLoginUser () {
  return {
    type: REQUEST_LOGIN_USER
  }
}

function onSuccessLoginUser (val) {
  val = val.data
  loginProgress(val)
  return {
    type: SUCCESS_LOGIN_USER,
    val: val
  }
}

function onErrorLoginUser (err) {
  return {
    type: ERROR_LOGIN_USER,
    err: err
  }
}

export function login(data) {
  return function (dispatch) {
    dispatch(requestLoginUser())
    return fetchCreator({
      url: '//api.test.redshift.cc/users/login',
      method: 'POST',
      body: data,
      success: res => dispatch(onSuccessLoginUser(res)),
      error: error => dispatch(onErrorLoginUser(error))
    })
  }
}
