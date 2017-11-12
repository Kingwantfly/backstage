import fetchCreator from '../../utils/fetchCreator'

//ActionType
const REQUEST_GET_SUPPLIER_LIST = 'REQUEST_GET_SUPPLIER_LIST';
const SUCCESS_GET_SUPPLIER_LIST = 'SUCCESS_GET_SUPPLIER_LIST';
const ERROR_GET_SUPPLIER_LIST = 'ERROR_GET_SUPPLIER_LIST';
const REQUEST_SEND_SUPPLIER_INVITATION = 'REQUEST_SEND_SUPPLIER_INVITATION';
const SUCCESS_SEND_SUPPLIER_INVITATION = 'SUCCESS_SEND_SUPPLIER_INVITATION';
const ERROR_SEND_SUPPLIER_INVITATION = 'ERROR_SEND_SUPPLIER_INVITATION';
const REQUEST_GET_SUPPLIER_DETAIL = 'REQUEST_GET_SUPPLIER_DETAIL';
const SUCCESS_GET_SUPPLIER_DETAIL = 'SUCCESS_GET_SUPPLIER_DETAIL';
const ERROR_GET_SUPPLIER_DETAIL = 'ERROR_GET_SUPPLIER_DETAIL';
// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case REQUEST_GET_SUPPLIER_LIST:
      return Object.assign({}, state, {
        isGettingSupplierList: true
    })
    case SUCCESS_GET_SUPPLIER_LIST:
      return Object.assign({}, state, {
        supplierList: action.val,
        isGettingSupplierList: false
    })
    case ERROR_GET_SUPPLIER_LIST:
      return Object.assign({}, state, {
        error: action.err,
        isGettingSupplierList: false
    })
    case REQUEST_SEND_SUPPLIER_INVITATION:
      return Object.assign({}, state, {
        isSendSupplierInvitation: true
    })
    case SUCCESS_SEND_SUPPLIER_INVITATION:
      return Object.assign({}, state, {
        isSendSupplierInvitation: false
    })
    case ERROR_SEND_SUPPLIER_INVITATION:
      return Object.assign({}, state, {
        error: action.err,
        isSendSupplierInvitation: false
    })
    case REQUEST_GET_SUPPLIER_DETAIL:
      return Object.assign({}, state, {
        isGettingSupplierDetail: true
    })
    case SUCCESS_GET_SUPPLIER_DETAIL:
      return Object.assign({}, state, {
        SupplierDetail: action.val,
        isGettingSupplierDetail: false
    })
    case ERROR_GET_SUPPLIER_DETAIL:
      return Object.assign({}, state, {
        error: action.err,
        isGettingSupplierDetail: false
    })
    default: {
      return state;
    }
  }
};

// 获取公司信息
function requestGetSupplierList () {
  return {
    type: REQUEST_GET_SUPPLIER_LIST
  }
}

function onSuccessGetSupplierList (val) {
  return {
    type: SUCCESS_GET_SUPPLIER_LIST,
    val: val
  }
}

function onErrorGetSupplierList (err) {
  return {
    type: ERROR_GET_SUPPLIER_LIST,
    err: err
  }
}

export function getSupplierList (params) {
  const url = `//api.test.redshift.cc/admin/connections?companyId=${params}`
  console.log(url);
  return function (dispatch) {
    dispatch(requestGetSupplierList())
    return fetchCreator({
      url: url,
      success: json => dispatch(onSuccessGetSupplierList(json.data)),
      error: error => dispatch(onErrorGetSupplierList(error))
    })
  }
}
// 发送供应商邀请
function requestSendSupplierInvitation () {
  return {
    type: REQUEST_SEND_SUPPLIER_INVITATION
  }
}

function onSuccessSendSupplierInvitation (val) {
  return {
    type: SUCCESS_SEND_SUPPLIER_INVITATION,
    val: val
  }
}

function onErrorSendSupplierInvitation (err) {
  return {
    type: ERROR_SEND_SUPPLIER_INVITATION,
    err: err
  }
}

export function sendSupplierInvitation (params) {
  console.log(params);
  return function (dispatch) {
    dispatch(requestSendSupplierInvitation())
    return fetchCreator({
      url: '//api.test.redshift.cc//admin/connections/email',
      method: 'POST',
      body: params,
      success: json => dispatch(onSuccessSendSupplierInvitation(json.data)),
      error: error => dispatch(onErrorSendSupplierInvitation(error))
    })
  }
}
// 获取供应商详情
function requestGetSupplierDetail () {
  return {
    type: REQUEST_GET_SUPPLIER_DETAIL
  }
}

function onSuccessGetSupplierDetail (val) {
  return {
    type: SUCCESS_GET_SUPPLIER_DETAIL,
    val: val
  }
}

function onErrorGetSupplierDetail (err) {
  return {
    type: ERROR_GET_SUPPLIER_DETAIL,
    err: err
  }
}

export function getSupplierDetail (params) {
  const url = `//api.test.redshift.cc/admin/connections/connectionId=${params}`
  return function (dispatch) {
    dispatch(requestGetSupplierDetail())
    return fetchCreator({
      url: url,
      success: json => dispatch(onSuccessGetSupplierDetail(json.data)),
      error: error => dispatch(onErrorGetSupplierDetail(error))
    })
  }
}
