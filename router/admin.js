/**
 * Created by computeradd on 2017/3/26.
 */
const express = require('express'),
      router = express.Router(),
    mysql = require("../module/mysql");

router.get("/",(req,res)=>{
    mysql("select * from user where admin = 0",(err,data)=>{
        if(err){
            console.log('出错啦');
            return;
        }
        if(data.length > 0){
            res.render("admin/index.ejs",{data:data});
        }else{
            res.render("admin/index.ejs",{data:'抱歉，没有数据'});
        }
    });

});

router.post("/",(req,res)=>{

});


module.exports = router;