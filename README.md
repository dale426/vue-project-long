# vue-project-long

mongodb 备份方法 ： 
 1. 启动mongod
 2. 在mongo安装目录下， 打开控制台

### vue-project-long

mongodb 备份 恢复方法 ： 
 1. 启动mongod
 2. 打开mongodb命令控制台：
 code： mongo

 3. 备份数据库： 
> mongodump -h 127.0.0.1:27017 -d myfund -o E:\long_project\vue-project-long\db
 4. 恢复数据库 --需要在shell脚本下执行
> mongorestore -h 127.0.0.1:27017 -d myfund --drop E:\longProject\vue-project-long\db\myfund