const path = require('path');
const webpackMerge = require('webpack-merge');

const appSrc = path.join(__dirname, 'src');

const {
  override, addLessLoader, addWebpackAlias, useBabelRc, addDecoratorsLegacy,
} = require('customize-cra');

//打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 这里可以直接修改 Host 或者 Port
// process.env.HOST = 'localhost.xxxx.com';
// process.env.PORT = 3006;
// 生成环境是否打包 Source Map
process.env.GENERATE_SOURCEMAP = false;

module.exports = {
  // 配置devServer
  devServer: configFunction => (proxy, allowedHost) => {
    proxy = {
      '/mock': {
        // 这里配置代理服务地址
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: { '^/mock': '' },
      },
    }
    // allowedHost： 添加额外的地址
    const config = configFunction(proxy, allowedHost);
    config.quiet = false;
    return config;
  },

  // 配置webpack 
  webpack: (config, env) => {
    // 开发环境
    const isEnvDevelopment = env === 'development';
    // 生产环境
    const isEnvProduction = env === 'production';

    // 通过customize-cra插件覆盖
    config = override(
      // 配置路径别名
      addWebpackAlias({ '@': appSrc }),
      // 对Decorators支持
      addDecoratorsLegacy(),
      useBabelRc(),
      // 添加less
      addLessLoader({ javascriptEnabled: true }),
    )(config, env);

    return webpackMerge(config, {
      // 用户可以在这里添加自定义的config配置 来增加修改loader, plugin, optimization
      plugins: [
        // new BundleAnalyzerPlugin(),
      ],
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendors: { // 基本框架
              chunks: 'all',
              test: /(react|react-dom|react-dom-router|babel-polyfill|mobx|antd)/,
              priority: 100,
              name: 'vendors',
            },
            asyncCommons: { // 其余异步加载包
              chunks: 'async',
              minChunks: 2,
              name: 'async-commons',
              priority: 90,
            },
            commons: { // 其余同步加载包
              chunks: 'all',
              minChunks: 2,
              name: 'commons',
              priority: 80,
            },
            // echartsVendor: { // 异步加载echarts包
            //   test: /echarts/,
            //   priority: 100, // 高于async-commons优先级
            //   name: 'echartsVendor',
            //   chunks: 'async'
            // },
          }
        },
      }
    })
  },

  // 配置测试
  jest: config => {
    config.moduleNameMapper = {
      // 同webpack一样配置别名
      '@/(.*)$': '<rootDir>/src/$1',
    }
    return config;
  },
}
