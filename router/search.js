/**
 * Created by computeradd on 2017/3/24.
 */
const express = require('express'),
      router = express.Router(),
    mysql = require('../module/mysql');

router.get("/",(req,res)=> {
    res.render("index.ejs");
});
router.post("/",(req,res)=>{
   let search =  res.body.search;
    mysql(`select * from artical where title like '%${search}%'`,(err,data)=>{
        if(err){
            return;
        }
        //请求成功去详情页
        res.render('item.ejs');
    });
});
module.exports = router;