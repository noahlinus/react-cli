# react脚手架

## 前言

每次使用官方的`create-react-app`脚手架，都需要配置一堆东西。这里在`create-react-app`的基础上增加功能，不进行`eject`保留`react-cript`，目的是保证和官方一致并且可以升级，把`eject`的权利保留给用户。所以这个脚手架是`create-react-app`的拓展，主要增加的框架扩展如下。

类型 | 可选框架名称
:- | :- 
语言 | JavaScript / TypeScript
状态管理库 | Redux / Mobx
css预处理器 | SCSS / LESS / Styled-Components
UI组件 | Antd / Ant-mobile
代码规范 | Airbnb

### 使用命令 

`react-cli create <app-name> `

选择`default (JavaScript, Mobx, Antd, Less, Router, ESLint)` 或者 `Manually select features `进行选择配置。
