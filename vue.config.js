const Components = require("unplugin-vue-components/webpack")
const {
  ElementPlusResolver,
  ElementUiResolver
} = require("unplugin-vue-components/resolvers")
const path = require("path")
const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  /*   chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("components", "@/components")

    config.plugins.set([
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ])
  } */
  configureWebpack: (config) => {
    config.resolve.alias = {
      "@": path.resolve(__dirname, "src"),
      components: "@/components"
    }
    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver(), ElementUiResolver()]
      })
    )
  }
})
