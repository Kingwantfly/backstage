import fetch from 'isomorphic-fetch';
import { clearLocalStorage } from './clearLocalStorage';

export default function fetchCreator ({
  url,
  success,
  error,
  method,
  body
}) {
  return fetch(url, {
    headers: {
      'token': window.localStorage.getItem('token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method || 'GET',
    body: JSON.stringify(body)
  }).then(rep => {
    if (!rep.ok) {
      let err = new Error(rep.statusText)
      err.response = rep
      throw err
    }
    return rep.json()
  }).then(json => {
    success instanceof Function && json.status && json.status === 200 && success(json) ||
    error instanceof Function && (json.status === 100202 ? clearLocalStorage() : error(json))
  }).catch(err => {
    error instanceof Function && error(err)
  })
}
