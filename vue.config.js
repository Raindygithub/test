const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,

  devServer:{
    port:7000
  },

  pluginOptions: {
    electronBuilder: {
        builderOptions: { 
            "electronDownload": {
                "mirror": "https://npm.taobao.org/mirrors/electron/"
            }
        }
    }
  },

  publicPath: './'
})


