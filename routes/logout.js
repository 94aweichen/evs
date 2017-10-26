
var express = require('express');
var router = express.Router();

router.get('/',function(req,res, next){
    //req.session.user = null;
    req.session.destroy(function (err) {
        if(err){
            console.log("session删除失败！返回json错误值");
            //res.json({result: 1});
            return;
        }
        res.clearCookie('evs');
        res.redirect('/login');
    });
});

module.exports = router;
