
# Tadpole MPA #

Tadpole 的 MPA(多页应用) 项目，使用 React 框架和 Material UI 库。在启动项目前，需要先在`~/config/config.json`文件中配置每个页面:

![image](https://raw.githubusercontent.com/WebUnion-core/tadpole/master/asset/intro/mpa-2.png)

配置说明如下:

1. port: MPA 运行端口。
2. pages: 各个页面的访问路由等信息。
    1. path: 路由。
    2. title: 页面标题。

MPA 平台首页截图:

![image](https://raw.githubusercontent.com/WebUnion-core/tadpole/master/asset/intro/mpa-1.png)

浏览器访问 URL 如: `http://192.168.1.101:20152/mpa/home`，管理员账号和密码保存于`~/client/mpa/common/index.js`文件中。

执行`npm run debug`命令之前，需要先将`~/config/config.json`中的 launchType 参数设置为 mpa。

> CREATE DATE: 2018-11-02
