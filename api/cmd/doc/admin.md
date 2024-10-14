# admin命令

此命令用于admin用户的管理。你可以使用此命令生成super用户。

一个系统里通常只允许存在一个super级别的用户，其他用户的级别都是admin。这在admin表里通过role字段进行标记。

### 子命令

- create 创建用户。

- delete 删除用户。

- password 更新用户密码。

- show 显示用户列表。

- help 查看帮助文档。

### 支持参数

| 参数 | 是否要携带值 | 说明 | 是否必须 |
|----|----|----|----|
| -n 或 <br>--name | 是 | 用户名 | create、delete、password必须指定 |
| -s 或 <br>--super | 否 | 创建用户时指定为super用户 | 否 |
| -p | 是 | 密码 | create、password必须携带 |

### 查看帮助文档

```shell
node cmd/admin.js help
```
help 参数不是必须的，默认的子命令即为help。

### 创建super用户

```shell
node cmd/admin.js create -n first -p 1234567 -s
```

### 删除用户

```shell
node cmd/admin.js delete -n first
```

### 更新密码

```shell
node cmd/admin.js password -n first -p 12345670
```

### 显示所有用户列表

```shell
node cmd/admin.js show 
```

### 显示特定用户信息

```shell
node cmd/admin.js show -n first
```
