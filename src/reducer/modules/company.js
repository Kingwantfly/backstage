import fetchCreator from '../../utils/fetchCreator'

// ActionType
const REQUEST_GET_COMPANY_LIST = 'REQUEST_GET_COMPANY_LIST';
const SUCCESS_GET_COMPANY_LIST = 'SUCCESS_GET_COMPANY_LIST';
const ERROR_GET_COMPANY_LIST = 'ERROR_GET_COMPANY_LIST';
const REQUEST_RESET_ACCOUNT = 'REQUEST_RESET_ACCOUNT';
const SUCCESS_RESET_ACCOUNT = 'SUCCESS_RESET_ACCOUNT';
const ERROR_RESET_ACCOUNT = 'ERROR_RESET_ACCOUNT';
const REQUEST_ADD_COMPANY = 'REQUEST_ADD_COMPANY';
const SUCCESS_ADD_COMPANY = 'SUCCESS_ADD_COMPANY';
const ERROR_ADD_COMPANY = 'ERROR_ADD_COMPANY';
const REQUEST_GET_COMPANY_DETAIL = 'REQUEST_GET_COMPANY_DETAIL';
const SUCCESS_GET_COMPANY_DETAIL = 'SUCCESS_GET_COMPANY_DETAIL';
const ERROR_GET_COMPANY_DETAIL = 'ERROR_GET_COMPANY_DETAIL';
const REQUEST_PUT_ACCOUNT_STATE = 'REQUEST_PUT_ACCOUNT_STATE';
const SUCCESS_PUT_ACCOUNT_STATE = 'SUCCESS_PUT_ACCOUNT_STATE';
const ERROR_PUT_ACCOUNT_STATE = 'ERROR_PUT_ACCOUNT_STATE';
const REQUEST_PUT_SUPPLIER_STATE = 'REQUEST_PUT_SUPPLIER_STATE';
const SUCCESS_PUT_SUPPLIER_STATE = 'SUCCESS_PUT_SUPPLIER_STATE';
const ERROR_PUT_SUPPLIER_STATE = 'ERROR_PUT_SUPPLIER_STATE';
const REQUEST_PUT_BASIC_STATE = 'REQUEST_PUT_BASIC_STATE';
const SUCCESS_PUT_BASIC_STATE = 'SUCCESS_PUT_BASIC_STATE';
const ERROR_PUT_BASIC_STATE = 'ERROR_PUT_BASIC_STATE';
const REQUEST_GET_VALIDATATOKEN = 'REQUEST__GET_VALIDATATOKEN';
const SUCCESS_GET_VALIDATATOKEN  = 'SUCCESS_GET_VALIDATATOKEN';
const ERROR_GET_VALIDATATOKEN  = 'ERROR_GET_VALIDATATOKEN';
// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_GET_COMPANY_LIST:
      return Object.assign({}, state, {
        isGettingCompanyList: true
    })
    case SUCCESS_GET_COMPANY_LIST:
      return Object.assign({}, state, {
        companyList: action.val,
        isGettingCompanyList: false
    })
    case ERROR_GET_COMPANY_LIST:
      return Object.assign({}, state, {
        error: action.err,
        isGettingCompanyList: false
    })
    case REQUEST_RESET_ACCOUNT:
      return Object.assign({}, state, {
        isResettingAccount: true
    })
    case SUCCESS_RESET_ACCOUNT:
      return Object.assign({}, state, {
        isResettingAccount: false
    })
    case ERROR_RESET_ACCOUNT:
      return Object.assign({}, state, {
        error: action.err,
        isResettingAccount: false
    })
    case REQUEST_ADD_COMPANY:
      return Object.assign({}, state, {
        isAddingCompany: true
    })
    case SUCCESS_ADD_COMPANY:
      return Object.assign({}, state, {
        isAddingCompany: false
    })
    case ERROR_ADD_COMPANY:
      return Object.assign({}, state, {
        error: action.err,
        isAddingCompany: false
    })
    case REQUEST_GET_COMPANY_DETAIL:
      return Object.assign({}, state, {
        isGettingCompanyDetail: true
    })
    case SUCCESS_GET_COMPANY_DETAIL:
      return Object.assign({}, state, {
        companyDetail: action.val,
        isGettingCompanyDetail: false
    })
    case ERROR_GET_COMPANY_DETAIL:
      return Object.assign({}, state, {
        error: action.err,
        isGettingCompanyDetail: false
    })
    case REQUEST_PUT_ACCOUNT_STATE:
      return Object.assign({}, state, {
        isPuttingAccountState: true
    })
    case SUCCESS_PUT_ACCOUNT_STATE:
      return Object.assign({}, state, {
        isPuttingAccountState: false
    })
    case ERROR_PUT_ACCOUNT_STATE:
      return Object.assign({}, state, {
        error: action.err,
        isPuttingAccountState: false
    })
    case REQUEST_PUT_SUPPLIER_STATE:
      return Object.assign({}, state, {
        isPuttingSupplierState: true
    })
    case SUCCESS_PUT_SUPPLIER_STATE:
      return Object.assign({}, state, {
        isPuttingSupplierState: false
    })
    case ERROR_PUT_SUPPLIER_STATE:
      return Object.assign({}, state, {
        error: action.err,
        isPuttingSupplierState: false
    })
    case REQUEST_PUT_BASIC_STATE:
      return Object.assign({}, state, {
        isPuttingBasicState: true
    })
    case SUCCESS_PUT_BASIC_STATE:
      return Object.assign({}, state, {
        isPuttingBasicState: false
    })
    case ERROR_PUT_BASIC_STATE:
      return Object.assign({}, state, {
        error: action.err,
        isPuttingBasicState: false
    })
    case REQUEST_GET_VALIDATATOKEN:
      return Object.assign({}, state, {
        gettingValidataToken: true
    })
    case SUCCESS_GET_VALIDATATOKEN:
      return Object.assign({}, state, {
        gettingValidataToken: false,
        validateToken: action.val
    })
    case ERROR_GET_VALIDATATOKEN:
      return Object.assign({}, state, {
        error: action.err,
        gettingValidataToken: false
    })
    default: {
      return state;
    }
  }
};
// 获取公司列表
function requestGetCompanyList () {
  return {
    type: REQUEST_GET_COMPANY_LIST
  }
}

function onSuccessGetCompanyList (val) {
  return {
    type: SUCCESS_GET_COMPANY_LIST,
    val: val
  }
}

function onErrorGetCompanyList (err) {
  return {
    type: ERROR_GET_COMPANY_LIST,
    err: err
  }
}

export function getCompanyList (params) {
  const url = `//api.test.redshift.cc/admin/companies?${params}`
  return function (dispatch) {
    dispatch(requestGetCompanyList())
    return fetchCreator({
      url: url,
      success: json => dispatch(onSuccessGetCompanyList(json.data)),
      error: error => dispatch(onErrorGetCompanyList(error))
    })
  }
}
// 重置管理员密码
function requestResetAccount () {
  return {
    type: REQUEST_RESET_ACCOUNT
  }
}

function onSuccessResetAccount (val) {
  return {
    type: SUCCESS_RESET_ACCOUNT,
    val: val
  }
}

function onErrorResetAccount (err) {
  return {
    type: ERROR_RESET_ACCOUNT,
    err: err
  }
}

export function resetAccount (params) {
  return function (dispatch) {
    dispatch(requestResetAccount())
    return fetchCreator({
      url: '//api.test.redshift.cc/admin/companies/reset-password',
      method:'POST',
      body: params,
      success: json => dispatch(onSuccessResetAccount(json.data)),
      error: error => dispatch(onErrorResetAccount(error))
    })
  }
}
// 创建核心企业
function requestAddCompany () {
  return {
    type: REQUEST_ADD_COMPANY
  }
}

function onSuccessAddCompany (val) {
  return {
    type: SUCCESS_ADD_COMPANY,
    val: val
  }
}

function onErrorAddCompany (err) {
  return {
    type: ERROR_ADD_COMPANY,
    err: err
  }
}

export function addCompany (params) {
  return function (dispatch) {
    dispatch(requestAddCompany())
    return fetchCreator({
      url: '//api.test.redshift.cc/admin/companies',
      method:'POST',
      body: params,
      success: json => dispatch(onSuccessAddCompany(json.data)),
      error: error => dispatch(onErrorAddCompany(error))
    })
  }
}
// 获取核心企业详情
function requestGetCompanyDetail () {
  return {
    type: REQUEST_GET_COMPANY_DETAIL
  }
}

function onSuccessGetCompanyDetail (val) {
  return {
    type: SUCCESS_GET_COMPANY_DETAIL,
    val: val
  }
}

function onErrorGetCompanyDetail (err) {
  return {
    type: ERROR_GET_COMPANY_DETAIL,
    err: err
  }
}

export function getCompanyDetail (params) {
  const url = `//api.test.redshift.cc/admin/companies/${params}`
  return function (dispatch) {
    dispatch(requestGetCompanyDetail())
    return fetchCreator({
      url: url,
      success: json => dispatch(onSuccessGetCompanyDetail(json.data)),
      error: error => dispatch(onErrorGetCompanyDetail(error))
    })
  }
}
// 核心企业模块管理灵活账期设置
function requestPutAccountState () {
  return {
    type: REQUEST_PUT_ACCOUNT_STATE
  }
}

function onSuccessPutAccountState (val) {
  return {
    type: SUCCESS_PUT_ACCOUNT_STATE,
    val: val
  }
}

function onErrorPutAccountState (err) {
  return {
    type: ERROR_PUT_ACCOUNT_STATE,
    err: err
  }
}

export function putAccountState (params) {
  console.log(params);
  const url = `//api.test.redshift.cc/admin/companies/${params.companyId}`
  return function (dispatch) {
    dispatch(requestPutAccountState())
    return fetchCreator({
      url: url,
      method: 'PUT',
      body: params,
      success: json => dispatch(onSuccessPutAccountState(json.data)),
      error: error => dispatch(onErrorPutAccountState(error))
    })
  }
}
// 核心企业供应商管理设置
function requestPutSupplierState () {
  return {
    type: REQUEST_PUT_SUPPLIER_STATE
  }
}

function onSuccessPutSupplierState (val) {
  return {
    type: SUCCESS_PUT_SUPPLIER_STATE,
    val: val
  }
}

function onErrorPutSupplierState (err) {
  return {
    type: ERROR_PUT_SUPPLIER_STATE,
    err: err
  }
}

export function putSupplierState (params) {
  console.log(params);
  const url = `//api.test.redshift.cc/admin/companies/${params.companyId}`
  return function (dispatch) {
    dispatch(requestPutSupplierState())
    return fetchCreator({
      url: url,
      method: 'PUT',
      body: params,
      success: json => dispatch(onSuccessPutSupplierState(json.data)),
      error: error => dispatch(onErrorPutSupplierState(error))
    })
  }
}
// 核心企业模块管理基础设置
function requestPutBasicState () {
  return {
    type: REQUEST_PUT_BASIC_STATE
  }
}

function onSuccessPutBasicState (val) {
  return {
    type: SUCCESS_PUT_BASIC_STATE,
    val: val
  }
}

function onErrorPutBasicState (err) {
  return {
    type: ERROR_PUT_BASIC_STATE,
    err: err
  }
}

export function putBasicState (params) {
  console.log(params);
  const url = `//api.test.redshift.cc/admin/companies/${params.companyId}`
  return function (dispatch) {
    dispatch(requestPutBasicState())
    return fetchCreator({
      url: url,
      method: 'PUT',
      body: params,
      success: json => dispatch(onSuccessPutBasicState(json.data)),
      error: error => dispatch(onErrorPutBasicState(error))
    })
  }
}
// 登录token验证
function requestGetValidataToken () {
  return {
    type: REQUEST_GET_VALIDATATOKEN
  }
}

function onSuccessGetValidataToken (val) {
  return {
    type: SUCCESS_GET_VALIDATATOKEN,
    val: val
  }
}

function onErrorGetValidataToken (err) {
  return {
    type: ERROR_GET_VALIDATATOKEN,
    err: err
  }
}

export function getValidataToken (params) {
  const url = `//api.test.redshift.cc/util/validateToken`
  return function (dispatch) {
    dispatch(requestGetValidataToken())
    return fetchCreator({
      url: url,
      success: json => dispatch(onSuccessGetValidataToken(json.data)),
      error: error => dispatch(onErrorGetValidataToken(error))
    })
  }
}
