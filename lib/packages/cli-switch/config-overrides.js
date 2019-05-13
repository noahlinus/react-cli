const path = require('path');
const webpackMerge = require('webpack-merge');

const appSrc = path.join(__dirname, 'src');

const {
  override, addWebpackAlias, useBabelRc, addDecoratorsLegacy,
} = require('customize-cra');

// 这里可以直接修改 Host 或者 Port
// process.env.HOST = 'localhost';
// process.env.PORT = 3003;

module.exports = {
  // 配置devServer
  devServer: configFunction => (proxy, allowedHost) => {
    proxy = {
      '/mock': {
        // 这里配置代理服务地址
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/mock': '' },
      },
    }
    // allowedHost： 添加额外的地址
    const config = configFunction(proxy, allowedHost);
    return config;
  },

  // 配置webpack
  webpack: (config, env) => {
    // 通过customize-cra插件覆盖
    config = override(
      // 配置路径别名
      addWebpackAlias({ '@': appSrc }),
      // 对Decorators支持
      addDecoratorsLegacy(),
      useBabelRc()
    )(config, env);

    return webpackMerge(config, {
      // 用户可以在这里添加自定义的config配置 来增加修改loader, plugin, optimization
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
