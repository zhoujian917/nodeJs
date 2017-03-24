/**
 * Created by computeradd on 2017/3/18.
 */

const express = require('express'),
      router = express.Router(),
     mysql = require('../module/mysql');

router.get("/",(req,res)=> {
      res.render("admin/login.ejs");
});
router.post("/",(req,res)=>{
      const username = req.body.username,
          pass = req.body.password;
      const sql = 'select * from user where username = ?'
      mysql(sql,[username],(err,data)=>{
            if(err){
                 res.send("出错啦!");
                  return;
            }
            if(data.length > 0){
                  if(data[0]['pass'] == pass){
                     //登录成功设置cookie
                      res.cookie('login',{name:username},{ maxAge: 1000*60*60*24 } );
                      res.render("index.ejs");
                      res.json({
                           code:0,
                           data:{
                                 result:"登录成功！"
                           }
                      });
                  }
            }else{
                  res.send("用户名不存在!");
                  return;
            }
      });
});
module.exports = router;