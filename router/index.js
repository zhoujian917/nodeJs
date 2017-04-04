/**
 * Created by computeradd on 2017/3/18.
 */
const express = require('express'),
       router = express.Router(),
      mysql = require('../module/mysql');

router.get("/",(req,res)=>{
    res.locals.admin = req.session.admin;
    mysql("select * from artical order by id limit 0,5",(err,data)=>{
        if(err){
           console.log("get artical errr");
            return;
        }
        if(data.length>0){
            mysql("select * from tag order by id",(err,dataTag)=>{
                if(err){
                    return;
                }
                if(dataTag.length>0){
                    mysql("select * from artical order by id desc limit 0,5",(err,dataRec)=>{
                        if(dataRec.length>0){
                            res.render("index.ejs",{data:data,dataTag:dataTag,dataRec:dataRec});
                        }
                    });

                }
            });

        }
    });
});
//博客
router.get("/blog_post",(req,res)=>{
    res.render("blog_post.ejs")
});
//
router.get("/gallery",(req,res)=>{
    mysql("select * from artical",(err,data)=>{
        if(err){
            return;
        }
        if(data.length>0){
            res.locals.res = 'success';
            res.render("gallery.ejs",{data:data});
        }
    });

});
router.get("/detail",(req,res)=>{
    mysql("select * from artical where id = ?",[req.query.id],(err,data)=>{
        if(err){
            return;
        }
        if(data.length>0){
            res.locals.res = 'success';
            res.render("detail.ejs",{data:data});
        }
    });

});
//关于我
router.get("/about",(req,res)=>{
    res.render("about.ejs");
});

router.get("/logout",function(req,res){
    res.clearCookie('login');
    res.redirect("/");
});
router.use("/search",require('./search'));
router.use("/register",require('./register'));
router.use("/pinglun",require('./pinglun'));
router.use("/login",require('./login'));

module.exports = router;