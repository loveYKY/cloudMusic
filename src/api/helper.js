import { http } from './http'
import { baseURL } from '@/configs'
// http请求
const request = (method = 'get', url = '', query = null, customConfig = {}) => {
  let config = {
    baseURL: baseURL,
    method,
    url,
    [method === 'get' ? 'params' : 'data']: query,
    ...customConfig
  }

  return http(config).then(res => res.data)
}


export { request }
