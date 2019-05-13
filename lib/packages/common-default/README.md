## 总体架构

基于官方`create-react-app`，并增加自选框架。

类型 | 可选框架名称
:- | :- 
语言 | JavaScript / TypeScript
状态管理库 | Mobx / Redux
css预处理器 | SCSS / LESS / Styled-Components
UI组件 | Antd / Ant-mobile
代码规范 | Airbnb
HTTP库 | Axios
路由 | react-router

## 使用

### npm start

启动本地调试 启动地址和配置可以在`config-overrides.js`修改

### npm run build

应用打包

### npm run test

测试应用

### npm run eject

将`react-scripts`暴露到应用顶层，操作不可逆，弹射后不能随官方脚手架升级

## 目录

> src 源码

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

## 代码规范

请遵守Airbnb JavaScript的代码规范：[Airbnb JavaScript 代码规范中文版](https://github.com/BingKui/javascript-zh#semicolons)
