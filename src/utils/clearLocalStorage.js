export function clearLocalStorage () {
  window.localStorage.setItem('token', '')
  window.localStorage.setItem('user', '')
  window.localStorage.setItem('role', '')
  window.localStorage.setItem('theme', '')
  window.localStorage.setItem('permissions', '')
  window.location.replace('/login')
}
