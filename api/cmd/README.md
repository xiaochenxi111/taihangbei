# 项目结构说明

- start.js是启动文件。

- app.js是应用初始化文件。

- route.js是路由配置文件。

- autoServ.js用于开发测试，它会监听相关目录和文件，代码更改后自动重启服务。

- routes目录是所有控制器所在目录。

- model中每个文件是一个模型类，表示一个数据库表。

- config是配置所在目录。

- lib是通用模块所在目录。

## 初始化

系统开始进行初始化：

```shell
node init.js
```

然后会在当前目录生成routes和model目录，这里面有一些可用的代码。

## 开发过程中启动服务

```shell
node autoServ.js
```

## 正式部署要运行的文件

```shell
node start.js
```

## 架构图

![](./docs/routes-架构图.png)
