require('../core/CommonUtil');

/**
 * 封装Http请求和回复处理
 */
HttpWrapper=function(){};

//request 包装
HttpWrapper.wrapReqParams = function(req, obj) {
    if (obj != null && obj != undefined) {
        if (typeof (obj) == 'object') {
            var params = CommonUtil.isObjEmpty(req.query) ? req.body : req.query;
            for ( var p in obj)
                if (params[p] != undefined) obj[p] = params[p];
            return obj;
        }
    } else {
        return CommonUtil.isObjEmpty(req.query) ? req.body : req.query;
    }
};

/**
 * 包装返回参数；重复的参数将覆盖；
 * obj类型错误，并不会抛出异常
 */
HttpWrapper.wrapRenderData = function(render_datas,obj){
    if(!CommonUtil.isObjEmpty(obj)){
        for(var p in obj)render_datas[p] = obj[p];
    }
    return render_datas;
};

