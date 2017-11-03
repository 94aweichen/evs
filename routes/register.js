
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
    res.render('userRegister', {cur_nav:'home', content: '您当前现在在用户注册页面！', name: req.session.loginUser });
});

router.post("/", function(req,res, next){
    if (req.body.username && req.body.password) {//判断是否有get参数page
        var user = new User();
        var user_arr = [];

        user.username = req.body.username;
        user.password = req.body.password;
        sqlClient.getByUsername(user,function(result){   // 同理 /login 路径的处理方式
            if(result != null && result.length > 0){
                console.log("用户名已存在！返回json错误值");
                user_arr = result;
                res.redirect('/register');
            }else{
                sqlClient.create(user,function(result){//创建
                    if(result){
                        console.log("创建成功！返回json成功值");
                        res.redirect('/login');
                    }
                    else{
                        console.log("创建失败！返回json失败值");
                        res.redirect('/register');
                    }
                });
            }
        });
    }
});

router.get('/app', function(req, res, next) {
    if (req.query.username && req.query.password && req.query.devid) {//判断是否有get参数page
        var user = new User();
        var user_arr = [];

        user.username = req.query.username;
        user.password = req.query.password;
        user.devid = req.query.devid;
        sqlClient.getByUsername(user,function(result){   // 同理 /login 路径的处理方式
            if(result != null && result.length > 0){
                console.log("用户名已存在！返回json错误值");
                user_arr = result;
                res.json({result:1});
            }else{
                sqlClient.create(user,function(result){//创建
                    if(result){
                        console.log("创建成功！返回json成功值");
                        res.json({result:0});
                    }else{
                        console.log("创建失败！返回json错误值");
                        res.json({result:2});
                    }
                });
            }
        });
    }
});

router.post('/app', function (req, res, next) {
    if (req.body.username && req.body.password && req.body.devid) {//判断是否有get参数page
        var user = new User();
        var user_arr = [];

        user.username = req.body.username;
        user.password = req.body.password;
        user.devid = req.body.devid;
        sqlClient.getByUsername(user,function(result){   // 同理 /login 路径的处理方式
            if(result != null && result.length > 0){
                console.log("用户名已存在！返回json错误值");
                user_arr = result;
                res.json({result:1});
            }else{
                sqlClient.create(user,function(result){//创建
                    if(result){
                        console.log("创建成功！返回json成功值");
                        res.json({result:0});
                    }else{
                        console.log("创建失败！返回json错误值");
                        res.json({result:2});
                    }
                });
            }
        });
    }
});

module.exports = router;
