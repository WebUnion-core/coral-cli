
# Tadpole #

![image](./asset/intro/head.jpg?v=1)

> Tadpole(中文名: 蝌蚪) 是由 WebUnion 自主开发的一款前后端统一框架，前端(客户端)使用的是 react.js 技术，后端(服务端)使用的是 Node.js 环境及 MongoDB 数据库。注意，在使用此框架前，请确认已安装 Node.js(v7+) 和 MongoDB，否则程序将无法正常运行。

## 安装 ##

```
npm i 或者 cnpm i
```

## 启动 ##

1. 启动 MongoDB: 确认安装好 MongoDB 之后，根据自己本地的 MongoDB 配置路径修改 db.bat 文件的内容，之后启动 db.bat 即可.

2. 启动服务端: 服务端负责数据管理，必须在客户端之前启动，启动命令有以下几种:

```
热更新模式(用于开发环境)
npm run watch

启动测试/开发环境服务器
npm run start-dev-server

启动生产环境服务器
npm run start-prod-server
```

3. 客户端相关: 相关命令有以下几种:

```
启动热更新服务器(用于开发环境)
npm run dev

启动测试/开发环境打包
npm run build-dev

启动生产环境打包
npm run build-prod
```

> CREATE DATE: 2018-07-19
