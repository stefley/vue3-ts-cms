import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import _request from "./service"
import { DataType } from "./service/request/type"
import store from "./store"

createApp(App).use(store).use(router).mount("#app")

_request.request<DataType>({
  url: "http://httpbin.org/get",
  method: "get",
  // interceptors: {
  //   requestInterceptor: (config: any) => {
  //     console.log("单独拦截", config)
  //     config.test = "test"
  //     return config
  //   }
  // },
  params: {
    name: "vue3"
  }
})
