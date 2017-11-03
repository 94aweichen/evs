var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    if(req.session.loginUser){
        res.render('index', {cur_nav:'home', title: 'EVS系统管理', name: req.session.loginUser });
    }else{
        res.redirect('/login');
    }
});

module.exports = router;
