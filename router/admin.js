/**
 * Created by computeradd on 2017/3/26.
 */
const express = require('express'),
      router = express.Router(),
    mysql = require("../module/mysql"),
    fs = require('fs');

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

//文章标签查询
router.get("/tag",(req,res)=>{
    mysql("select * from tag",(err,data)=>{
        if(err){
           console.log("select tag err");
            return;
        }
        if(data.length>0){
            res.render("admin/tag.ejs",{data:data});
        }
    });
});
//删除tag
router.get("/deltag",(req,res)=>{
    mysql("delete from tag where id = ?",[ req.query.id ],(err,data)=>{
        if(err){
            console.log("tag err");
            return;
        }
        if(data.affectedRows == 1){
            res.redirect("tag");
        }else{
            res.send("删除出错啦！");
        }
    });
});

//删除用户
router.get("/del",(req,res)=>{
    mysql("delete from user where id = ?",[ req.query.id ],(err,data)=>{
        if(err){
            console.log("  user err");
            return;
        }
        if(data.affectedRows == 1){
            res.redirect("/admin");
        }else{
            res.send("删除出错啦！");
        }
    });
});
router.get("/views",(req,res)=>{
    let dir = fs.readdirSync(`${process.cwd()}`/+'views');
    res.render('views.ejs',{data:dir});
});
//添加文章标签
router.post("/addTag",(req,res)=>{
    console.log(req.body);
    const sql="insert into tag values (0,?,?)";
    mysql(sql,[req.body['tagname'],0],(err,data)=>{
        if(err){
            res.locals.addTagRes = "err";
           console.log("add tag err");
        }
        if(data.affectedRows == 1){
            res.locals.addTagRes = "success";
        }else{
            res.locals.addTagRes = "fails";
        }
        res.redirect("tag");
    });

})
module.exports = router;