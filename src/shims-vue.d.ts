/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 使用 process.env.VUE_APP_BASEURL
declare const VUE_APP_BASEURL: string;
