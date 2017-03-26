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
            mysql("select count(*) as count from user",(err,data1)=>{
                if(err){
                    console.log('user count err');
                    return;
                }
                if(data.length > 0){
                    res.render("admin/index.ejs",{data:data,count:data1[0]['count']});
                }
            });

        }else{
            res.render("admin/index.ejs",{data:'抱歉，没有数据'});
        }
    });

});

router.post("/",(req,res)=>{

});
//修改用户信息
router.get("/update",(req,res)=>{
    res.render('admin/account.ejs');
});

//删除用户
router.get("/del",(req,res)=>{
    mysql("delete from user where id = ?",[ req.query.id ],(err,data)=>{
        if(err){
            console.log("updata user err");
            return;
        }
        if(data.affectedRows == 1){
            res.redirect("/admin");
        }else{
            res.send("删除出错啦！");
        }
    });
});

module.exports = router;