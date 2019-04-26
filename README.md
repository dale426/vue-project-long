### vue-project-long



## server

### mongo启动方法：
```shell
1. cmd打开命令控制台
2. mongod --dbpath D:\data\db   # D:\data\db 后面为数据库地址
```
或者直接在安装目录使用 mongod启动
### mongodb 备份 恢复方法 ： 

 1. 备份数据库： 
> mongodump -h 127.0.0.1:27017 -d myfund -o E:\long_project\vue-project-long\db
 2. 恢复数据库 --需要在shell脚本下执行
> mongorestore -h 127.0.0.1:27017 -d myfund --drop E:\longProject\vue-project-long\db\myfund

### 连接mongodb数据库
1. 本地mongodb连接
```shell
mongo
```
2. 远程mongo连接
```shell
mongo 127.0.0.1:27017
```

## mongo命令
```shell
1. show dbs  #查看数据库
2. use myfun #切换数据库
3. db.fund.insert({"name": "long"}) #创建表并插入数据
4. show collertions #查询表
5. db.holdfundlists.find({"code":"004450"}) # 数据库查询
```