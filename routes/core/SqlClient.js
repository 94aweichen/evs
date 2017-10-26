
require('../core/CommonUtil');
var pool = require('../db_config');

/**
 * mysql SqlClient 客户端
 */
SqlClient=function(){};
SqlClient.prototype={

    /**
     *根据id获取
     *obj ：model对象
     *callback ：回调函数
     */
    getById : function(obj,callback){
        pool.getConnection(function(err, connection) {
            var sql = 'SELECT * FROM '+obj['table_name']+' WHERE ID = '+obj['id'];
            console.log('##    sql: '+sql);
            connection.query(sql, function(err, result) {
                if(err){
                    console.log('[getById error] - ',err.message);
                    return;
                }
                callback(result);
            });
            connection.release();
        });
    },

    /**
     *根据id获取
     *obj ：model对象
     *callback ：回调函数
     */
    getByUsername : function(obj,callback){
        pool.getConnection(function(err, connection) {
            var sql = 'SELECT * FROM '+obj['table_name']+' WHERE username = \''+obj['username']+'\'';
            console.log('##    sql: '+sql);
            connection.query(sql, function(err, result) {
                if(err){
                    console.log('[getById error] - ',err.message);
                    return;
                }
                callback(result);
            });
            connection.release();
        });
    },

    /**
     *查询列表
     *obj ：model对象
     *callback ：回调函数
     */
    query : function(obj,callback){
        pool.getConnection(function(err, connection) {
            var sql = 'SELECT * FROM '+obj['table_name'];
            console.log('##    sql: '+sql);
            connection.query(sql, function(err, result) {
                if(err){
                    console.log('[query error] - ',err.message);
                    return;
                }
                callback(result);
            });
            connection.release();
        });
    },

    /**
     *创建：根据model对象实例处理属性和值；
     *obj ：model对象
     *callback ：回调函数
     */
    create : function(obj,callback){
        var cols = [];
        var params = [];
        var paramValues = [];
        for(var name in obj){
            if(obj.hasOwnProperty(name) && name != 'table_name'){
                if(name == 'id' && CommonUtil.isStrEmpty(obj[name])){//mysql id 自增处理
                    continue;
                }else{
                    console.log(obj.hasOwnProperty(name));
                    cols.push(name);
                    params.push('?');
                    paramValues.push(obj[name]);
                }
            }
        }
        pool.getConnection(function(err, connection) {
            var sql = 'INSERT INTO '+obj['table_name']+'('+cols.join(',')+') VALUES('+params+')';
            console.log('##    sql: '+sql);
            console.log('## values: '+paramValues);
            connection.query(sql,paramValues,function (err, result) {
                if(err){
                    console.log('[create error] - ',err.message);
                    return;
                }
                callback(result.insertId);//插入的id
            });
            connection.release();
        });
    },

    /**
     *更新，如果不为null就更新
     *obj ：model对象
     *callback ：回调函数
     */
    update : function(obj,callback){
        var cols = [];
        var paramValues = [];
        for(var name in obj){
            if(obj.hasOwnProperty(name) && name != 'table_name' && name != 'id' && obj[name] != null){
                cols.push(name+"=?");
                paramValues.push(obj[name]);
            }
        }
        pool.getConnection(function(err, connection) {
            var sql = 'UPDATE '+obj['table_name']+' SET '+cols.join(',') + ' WHERE ID = ' + obj['id'];
            console.log('##    sql: '+sql);
            console.log('## values: '+paramValues);
            connection.query(sql,paramValues,function (err, result) {
                if(err){
                    console.log('[update error] - ',err.message);
                    return;
                }
                callback(result.affectedRows);//影响的行数
            });
            connection.release();
        });
    },

    /**
     *根据id删除
     *obj ：model对象
     *callback ：回调函数
     */
    deleteById : function(obj,callback){
        pool.getConnection(function(err, connection) {
            var sql = 'DELETE FROM '+obj['table_name']+' WHERE ID = '+obj['id'];
            console.log('##    sql: '+sql);
            connection.query(sql, function(err, result) {
                if(err){
                    console.log('[deleteById error] - ',err.message);
                    return;
                }
                callback(result.affectedRows);//影响的行数
            });
            connection.release();
        });
    },

    /**
     *执行SQL
     *sql ：要执行的sql
     *paramValues：sql中需要的参数
     *callback ：回调函数
     */
    queryBySql : function(sql,paramValues,callback){
        pool.getConnection(function(err, connection) {
            console.log('##    sql: '+sql);
            console.log('## values: '+paramValues);
            connection.query(sql,paramValues,function (err, result) {
                if(err){
                    console.log('[queryBySql error] - ',err.message);
                    return;
                }
                callback(result);
            });
            connection.release();
        });
    }

};



