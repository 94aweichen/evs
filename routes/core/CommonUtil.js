
/**
 * 工具类
 */
CommonUtil=function(){};

//判断字符串是否为空
CommonUtil.isStrEmpty = function(text){
    if(text == undefined || text == null || text == '' || text == 'null' || text == 'undefined'){
        return true;
    }
    return text.replace(/(\s*$)/g, '') == '';
};

//删除左右两端的空格
CommonUtil.trim = function(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
};

//删除左边的空格
CommonUtil.ltrim = function(str){
    return str.replace(/(^\s*)/g,"");
};

//删除右边的空格
CommonUtil.rtrim = function(str){
    return str.replace(/(\s*$)/g,"");
};

//判断对象是否为空
CommonUtil.isObjEmpty = function(obj){
    if(obj != null && obj != undefined && typeof(obj) == 'object'){
        for (var p in obj){
            return false;
        }
        return true;
    }
    return true;
};

//产生uuid字符串
CommonUtil.uuid = function(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "";
    var uuid = s.join("");
    return uuid;
};



