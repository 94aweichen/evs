
var express = require('express');
var router = express.Router();

require('./core/HttpWrapper');
require('./core/SqlClient');
require('./cms/model');

/* GET users listing. 
*  app.js 中注册路由配置代码 app.use('/users', users);
*  所以在请求用户的任何路径前都要添加 /users 开始；
*/

var sqlClient = new SqlClient();//数据库访问对象

router.get('/', function(req, res, next) {
    if(req.session.loginUser){
        next();
    }else{
        res.render('userLogin', {cur_nav:'user_login', title: 'EVS系统管理', name: req.session.loginUser });
    }
});

router.post("/", function(req,res, next){   // 从此路径检测到post方式则进行post数据的处理操作
    if (req.body.username && req.body.password) {
        var user = new User();
        var user_arr = [];

        user.username = req.body.username;                //获取post上来的 data数据中 uname的值
        sqlClient.getByUsername(user,function(result){   //通过此model以用户名的条件 查询数据库中的匹配信息
            //console.log(result!=null);
            //console.log(result.length);
            if(result != null && result.length > 0){
                user_arr = result;
                console.log(user_arr[0].password);
                console.log(req.body.password);
                if(req.body.password != user_arr[0].password){    //查询到匹配用户名的信息，但相应的password属性不匹配
                    req.session.error = "密码错误";
                    console.log("密码错误！返回json错误值");
                    //res.json({error:1});
                    res.redirect('/login');
                }else{    //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                    req.session.regenerate(function (err) {
                        if(err){
                            console.log("session生成失败！返回json错误值");
                            return;
                        }
                        req.session.loginUser = user_arr[0].username;
                        console.log("密码正确！返回json正确值");
                        //res.json({success:1});
                        res.redirect('/');
                    });
                }
            }else{
                req.session.error = "用户名不存在";
                console.log("用户名不存在！返回json错误值");
                //res.json({error:2});
                res.redirect('/login');
            }
        });
    }
});

router.get('/app', function(req, res, next) {
    if (req.query.username && req.query.password) {//判断是否有get参数page
        var user = new User();
        var user_arr = [];

        user.username = req.query.username;                //获取post上来的 data数据中 uname的值
        sqlClient.getByUsername(user,function(result){   //通过此model以用户名的条件 查询数据库中的匹配信息
            //console.log(result!=null);
            //console.log(result.length);
            if(result != null && result.length > 0){
                user_arr = result;
                console.log(user_arr[0].password);
                console.log(req.query.password);
                if(req.query.password != user_arr[0].password){    //查询到匹配用户名的信息，但相应的password属性不匹配
                    //req.session.error = "密码错误";
                    console.log("密码不正确！返回json错误值");
                    res.json({result:1});
                    //res.redirect('/');
                }else{    //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                    req.session.loginUser = user_arr[0].username;
                    console.log("密码正确！返回json正确值");
                    res.json({result:0});
                    //res.redirect('/users');
                }
            }else{
                //req.session.error = '用户名不存在';
                console.log("用户名不存在！返回json错误值");
                res.json({result:2});
                //res.redirect('/');
            }
        });
    }
});

router.post('/app', function (req, res, next) {
    if (req.body.username && req.body.password) {
        var user = new User();
        var user_arr = [];

        user.username = req.body.username;                //获取post上来的 data数据中 uname的值
        sqlClient.getByUsername(user,function(result){   //通过此model以用户名的条件 查询数据库中的匹配信息
            //console.log(result!=null);
            //console.log(result.length);
            if(result != null && result.length > 0){
                user_arr = result;
                console.log(user_arr[0].password);
                console.log(req.body.password);
                if(req.body.password != user_arr[0].password){    //查询到匹配用户名的信息，但相应的password属性不匹配
                    //req.session.error = "密码错误";
                    console.log("密码不正确！返回json错误值");
                    res.json({result:1});
                    //res.redirect('/');
                }else{    //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                    req.session.loginUser = user_arr[0].username;
                    console.log("密码正确！返回json正确值");
                    res.json({result:0});
                    //res.redirect('/users');
                }
            }else{
                //req.session.error = '用户名不存在';
                console.log("用户名不存在！返回json错误值");
                res.json({result:2});
                //res.redirect('/');
            }
        });
    }
});

module.exports = router;
