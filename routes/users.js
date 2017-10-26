
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
	
    //从数据库读取数据
	var user = new User();
	var user_arr = [];
	sqlClient.query(user,function(result){
		if(result != null && result.length > 0){
			user_arr = result;
		}
		res.render('userIndex', {cur_nav:'user_mng', content: '您当前现在在用户主页！', user_arr:user_arr, name: req.session.user });
	});
	
});

//添加用户
router.get('/create', function(req, res, next) {
    res.render('userMerge', {cur_nav:'user_mng', name: req.session.user});
});

//保存用户
router.post('/create', function(req, res, next) {
	//保存数据到数据库
	var user = new User();
	HttpWrapper.wrapReqParams(req,user);//转换参数到对象
	console.log(user.realname);
	sqlClient.create(user,function(result){//创建
		res.redirect('/users/');
	});
});

//删除用户
router.get('/delete', function(req, res, next) {
	var delUser = new User();
	delUser.id = req.query.id;
	sqlClient.deleteById(delUser,function(result){
		res.redirect('/users/');
	});
});

var page_count = 20;//分页条数
router.get('/getuserjson', function (req, res) {
    var ret = [];//返回的分页json初始化
    if (req.query.page) {//判断是否有get参数page
        if (parseInt(req.query.page) >= 0) {//
            for (var i = 0; i < page_count; i++) {//遍历获取
                ret[ret.length] = vdo_info_ls[parseInt(req.query.page) * page_count + i];
            }
        }
    }
    res.json(ret);//返回json
});

module.exports = router;
