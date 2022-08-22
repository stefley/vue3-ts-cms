import { AxiosRequestConfig } from "axios"
import Request from "./request"
import { BASE_URL, TIMEOUT } from "./request/config"

const _request = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config: AxiosRequestConfig) => {
      const token = "token_z"
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        }
      }
      return config
    }
  }
})
export default _request
