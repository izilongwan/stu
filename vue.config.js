const { join } = require('path');
const resolve = dir => join(__dirname, dir);
const isProd = process.env.NODE_ENV !== 'development';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const cdn = {
  css: ["//unpkg.com/element-ui@2.13.1/lib/theme-chalk/index.css"],
  js: [
    "//unpkg.com/vue@2.6.11/dist/vue.min.js",
    "//unpkg.com/vue-router@3.1.3/dist/vue-router.min.js",
    "//unpkg.com/vuex@3.1.2/dist/vuex.min.js",
    "//unpkg.com/axios@0.19.1/dist/axios.min.js",
    "//unpkg.com/element-ui@2.13.1/lib/index.js"
  ]
};

module.exports = {
  devServer: {
    hotOnly: true
  },

  assetsDir: 'static',

  lintOnSave: true,

  chainWebpack: config => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('config', resolve('src/config'))
      .set('api', resolve('src/api'))
      .set('images', resolve('src/assets/images'))
      .set('styles', resolve('src/assets/styles'))
      .set('data', resolve('src/assets/data'))
      .set('js', resolve('src/assets/js'))
      .set('cpt', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('models', resolve('src/models'))
      .set('utils', resolve('src/utils'));

    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index');
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload-index');
    // 配置cdn引入
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn;
      return args;
    });

    return config;
  },

  configureWebpack: config => {
    config.externals = {
      vue: "Vue",
      "element-ui": "ELEMENT",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios"
    };

    if (isProd) {
      //gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
      // 公共代码抽离
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            //公用模块抽离
            common: {
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
            },
            //第三方库抽离
            vendor: {
              priority: 1, //权重
              test: /node_modules/,
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
            },
          },
        },
      };
    }
  }
};
