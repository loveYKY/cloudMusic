import Axios from 'axios'
import Cookies from 'js-cookie'
import Store from '@/store'
import { redirectToLogin } from '@/configs'
const RESP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401
}

const http = Axios.create({
  responseType: 'json',
  timeout: 30000,
  withCredentials: true
})

/**
 * 请求拦截器
 * 若存在token时，附带到Authorization请求头中，用于校验用户登录态
 */
http.interceptors.request.use(async config => {
  let token = null
  const headers = token
    ? {
        ...config.headers,
        cookie: Cookies.get('cookie'),
        token: token
      }
    : config.headers

  return {
    ...config,
    headers
  }
})

/**
 * 响应拦截器
 */
// http.interceptors.response.use(
//   response => {
//     // 未通过鉴权校验时，跳转至登录页, 删除token和用户信息
//     if (response.data.code == 401) {
//       redirectToLogin()
//     }
//     return response
//   },
//   err => {
//     const { status } = err.response || {}
//     if (status === RESP_STATUS.UNAUTHORIZED) {
//       redirectToLogin()
//     }
//     return Promise.reject(err)
//   }
// )

export { http }
