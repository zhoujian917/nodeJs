/**
 * Created by computeradd on 2017/3/18.
 */

const express = require('express'),
      router = express.Router(),
     mysql = require('../module/mysql'),
    crypto = require('crypto');

router.get("/",(req,res)=> {
      res.render("admin/login.ejs");
});
router.post("/",(req,res)=>{
      const username = req.body.username,
          pass = req.body.password,
          md5 = crypto.createHash('md5');
      const sql = 'select * from user where username = ?'
      mysql(sql,[username],(err,data)=>{
            if(err){
                 res.send("出错啦!");
                  return;
            }
            if(data.length > 0){
                 let newpass = md5.update(pass).digest('hex');
                  if(data[0]['pass'] == newpass){
                     //登录成功设置cookie
                      res.cookie('login',{name:username},{ maxAge: 1000*60*60*24 } );
                      //成功设置session  所有后台都是可以访问到的
                      req.session.admin = data[0]['admin'];
                      res.json({
                           code:0,
                           data:{
                                admin:data[0]['admin'],
                                result:"登录成功！"
                           }
                      });
                  }else{
                      res.send("用户名或密码错误!");
                  }
            }else{
                  res.send("用户名或密码错误!");
            }
      });
});
module.exports = router;