/**
 * 与表 t_user 对应的 javascript 对象；
 */
User=function(){
    this.table_name='t_user'; //数据库表名 【必须】
    this.id=null; 		//mysql数据库，id自增类型 【必须】
    this.username=null;//对应字段 username
    this.password=null;//对应字段 password
    this.realname=null;//对应字段 realname
    this.sex=null;//对应字段 sex
    this.birthday=null;//对应字段 birthday
    this.idcardnum=null;//对应字段 idcardnum
    this.phonenum=null;//对应字段 phonenum
    this.rankname=null;//对应字段 rank
    this.devid=null;//对应字段 devid
};
