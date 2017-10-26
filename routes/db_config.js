
/**
 * 需要安装mysql组件
 * 类似于安装express，执行：npm install mysql 即可；
 * 在node_modules 目录下多出 mysql 模块
 *（或者从其他项目中拷贝进来也可以）
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',  //ip或者域名
    port: '3306',   //端口号
    user: 'root',   //数据库的用户名
    password: '123456',    //密码
    database: 'test'  //数据库名称
});

module.exports = pool;
