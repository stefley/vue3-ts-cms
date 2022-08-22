import axios, { AxiosInstance } from "axios"
import { RequestConfig, RequestInterceptors } from "./type"
import { ElLoading } from "element-plus"
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading"

class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  showLoading?: boolean
  loading?: LoadingInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config?.interceptors
    this.showLoading = config.showLoading ?? false

    // 传入的拦截器不为空，则注册拦截器
    // 请求拦截先添加的后拦截，响应拦截先添加的先拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 默认拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0,0,0, 0.5)"
          })
        }
        return config
      },
      (error: any) => {
        return error
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log("res:", res)
        this.loading?.close()
        const data = res.data
        switch (data.code) {
          case -1:
            console.log("-1")
            break
          default:
            break
        }
        return res.data
      },
      (error: any) => {
        switch (error.response.status) {
          case 404:
            console.log("404")
            break
          default:
            break
        }
        return error
      }
    )
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      config = config.interceptors?.requestInterceptor?.(config) ?? config
      this.showLoading = config.showLoading ?? false
      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          res = config.interceptors?.responseInterceptor?.(res) ?? res
          console.log(res)
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  get<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }
}

export default Request
