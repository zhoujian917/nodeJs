/**
 * Created by computeradd on 2017/4/4.
 */
const express = require('express'),
      router = express.Router();

router.get("/",(req,res)=>{
    res.render("/");
});

router.post("/",(req,res)=>{
    console.log(111);
   console.log(req.body);
   const time = new Date().toLocaleString().substring(0,10),
       content = req.body.content,
       aid = req.body.aid;
    if(req.cookies.login.name==undefined){
        res.locals.res="请登录!"
        return;
    }
    mysql("insert into comment (id,aid,content,time,user) values (0,?,?,?,?)",[aid,content,time,req.cookies.login.name],(err,data)=>{
        if(err){
           return;
        }
        if(data.affectedRows==1){
            mysql("select * from artical where id = ?",[aid],(err,data)=>{
                if(err){
                    return;
                }
                if(data.length>0){
                    res.locals.res=='success';
                    res.locals.pl = '1';
                    res.redirect("/detail?id=4");
                }
            });

        }
    });
});

module.exports = router;