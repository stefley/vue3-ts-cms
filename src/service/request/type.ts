import type { AxiosRequestConfig, AxiosResponse } from "axios"

export interface RequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
  showLoading?: boolean
}

export interface DataType {
  data: any
  code: string
  success: string
}
