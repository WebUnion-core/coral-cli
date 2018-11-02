
# Tadpole SPA #

Tadpole 的 SPA(单页应用) 项目，使用 React 框架。在启动项目前，需要先在`~/config/config.json`文件中配置每个页面:

![image](https://raw.githubusercontent.com/WebUnion-core/tadpole/master/asset/intro/spa-2.png)

配置说明如下:

1. path: 打包路径。
2. title: 页面标题。
3. port: SPA 运行端口。

路由文件路径为`~/client/spa/data.json`，自行配置路由模块名和访问 URL。

SPA 平台首页截图:

![image](https://raw.githubusercontent.com/WebUnion-core/tadpole/master/asset/intro/spa-1.png)

浏览器访问 URL 如: `http://192.168.1.101:20151/spa`。

执行`npm run debug`命令之前，需要先将`~/config/config.json`中的 launchType 参数设置为 spa。

> CREATE DATE: 2018-11-02
