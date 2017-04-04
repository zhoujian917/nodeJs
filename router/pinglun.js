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
    if(req.cookies.login.name==undefined){
        res.locals.res="请登录!"
        return;
    }
    mysql("insert into pinglun values (0,?,?,?)",[],(err,data)=>{
        if(err){
           return;
        }
    });
});

module.exports = router;