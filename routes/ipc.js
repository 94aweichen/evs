
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('ipcIndex', {cur_nav:'ipc_mng', content: '您当前现在在监控主页！', name: req.session.user });
});

//输入设备号
router.get('/connect', function(req, res, next) {
    res.render('ipcConnect', {cur_nav:'ipc_mng'});
});

//连接监控
router.post('/connect', function(req, res, next) {
    res.render('ipcIndex', {cur_nav:'ipc_mng'});
});


module.exports = router;
