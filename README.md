# react脚手架

## 总体架构

基于react官方脚手架，并增加自选框架（如下）。优点是增加可配置性，并且每次创建都会保持和官方最新同步。

类型 | 可选框架名称
:- | :- 
语言 | JavaScript / TypeScript
状态管理库 | Redux / Mobx
css预处理器 | SCSS / LESS / styled-components
UI组件 | Antd / Ant-mobile
代码规范 | Airbnb
HTTP库 | Axios
路由 | react-router

## 安装

`npm i xd-react-cli -g`

## 初始化项目

`react-cli create <app-name>`

用户第一次创建有两个选项

- `default (JavaScript, Mobx, Antd, Less, Router, ESLint)` 默认配置
- `Manually select features ` 选择配置

第二次创建的时候会多一个用户上次选择过的选项配置`config`

## 项目中使用

### npm start

启动本地调试 启动地址和配置可以在`config-overrides.js`修改

### npm run build

应用打包

### npm run test

测试应用

### npm run eject

将`react-scripts`暴露到应用顶层，操作不可逆，弹射后不能随官方脚手架升级

## 目录

> `public`

    favicon.icn --项目图标

    index.html --html入口

    manifest.json --PWA应用配置文件

> `src`

    api  --异步请求集合

    assets  --静态资源

    components  --细小的组件，能复用

    routes --路由集合管理

    modules --各个业务模块

    stores  --状态管理

    style  --全局样式（页面样式写在各自页面中）

    utils  --工具类文件（包括fetch等）

    test --测试目录

    App.js --应用入口文件

    index.js --入口文件

    serviceWorker.js -- PWA应用缓存离线策略，需要在index.js中开启

> `config-overrides.js` -- 配置文件 Webpack devServer jest都在这里配置

> `.babelrc` -- babel相关配置

## 关于config-overrides配置

完全不用担心无法定制的问题，用户可以在里面配置Webpack devServer jest。完全可以在这里添加自定义的config配置来增加修改loader, plugin, optimization进行配置。`webpackMerge`使用混入的方式去添加config。

## 代码规范

请遵守Airbnb JavaScript的代码规范：[Airbnb JavaScript 代码规范中文版](https://github.com/BingKui/javascript-zh#semicolons)

## 未完成

1. TypeScript相关支持，后期加上
2. 等待tdui 3.0，后期配合使用
