
var express = require('express');
var path = require('path');
var router = express.Router();

var fs = require('fs');
var rd = require('rd');

//var vdo_path = __dirname + "\\videos\\";//视频文件夹路径
var vdo_path = path.resolve(__dirname, "..\\public\\videos\\");//视频文件夹路径

console.log(vdo_path);
var vdo_info_ls = [];//获取到的文件信息集
function getFileInfo(p_path) {//遍历文件夹
    try {
        var files = rd.readSync(p_path);//获取目录下所有文件和文件夹
        for (var i in files) {//循环遍历
            if (!fs.lstatSync(files[i]).isDirectory()) {//判断是否为文件
                if (files[i].toLowerCase().split(".mp4").reverse()[0].length== 0) {//判断是否为MP4格式文件(这里默认以MP4为例 其他格式大家自行过滤)
                    vdo_info_ls[vdo_info_ls.length]={
                        name: files[i].split("\\").reverse()[0].replace(".mp4", "").replace(".MP4", ""),//获取文件名
                        url: ("\\videos"+ files[i].replace(vdo_path, "")).replace(/\\/g, '/'), //获取文件的web路径
                        mtime: fs.statSync(files[i]).mtime//修改时间作为发布时间
                    }//添加信息到文件信息集
                }
            }
        }
        console.log(vdo_info_ls);
    }
    catch (e) {
        console.log(e);
    }
}

function reGetFileInfos() {//这里是为了大家以后写后台进行文件刷新时使用
    vdo_info_ls = [];//初始化集合
    getFileInfo(vdo_path); //遍历文件夹
    vdo_info_ls.sort(function (a, b) {//时间排序
        return Date.parse(b.ctime) - Date.parse(a.ctime);//时间正序(不过这个方法好像只能对月日起效 对年好像不起作用)
    });
}

router.get('/', function(req, res, next) {
    reGetFileInfos();//初始化文件信息集
    //res.render('Media', {cur_nav:'vdo_list', content: '您当前现在在媒体主页！'});
    res.render('vdoList', {cur_nav:'vdo_list', content: '您当前现在在媒体主页！', name: req.session.loginUser });
});

router.get('/select', function(req, res, next) {
    res.render('vdoSelect', {cur_nav:'vdo_list', content: '您当前现在在媒体主页！', name: req.session.loginUser });
});

router.post('/select', function(req, res, next) {
    reGetFileInfos();//初始化文件信息集
    res.render('vdoList', {cur_nav:'vdo_list', content: '您当前现在在媒体主页！', name: req.session.loginUser });
});

var page_count = 20;//分页条数
router.get('/getvdojson', function (req, res) {
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
