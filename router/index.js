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
                        let arr = [];
                        if(dataRec.length>0){
                            for(var i = 0;i<data.length;i++){
                                let _index = i;
                                const aid = data[_index]['id'];
                                mysql("select count(*) as num from comment where aid = ?",[aid],(err,dataCom)=>{
                                    if(err){
                                        return;
                                    }
                                    arr.push( dataCom[0]['num']);
                                });
                            }
                            console.log(11);
                            console.log(arr);
                            res.render("index.ejs",{arr:arr,data:data,dataTag:dataTag,dataRec:dataRec});
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
            mysql("select * from comment where aid = ? order by id desc",[req.query.id],(err,dataCom)=>{
                if(err){
                   return;
                }
                if(dataCom.length>0){
                    res.locals.res = 'success';
                    res.locals.pl = '1';
                    res.render("detail.ejs",{dataCom:dataCom,data:data});
                }else{
                    res.locals.res = 'success';
                    res.render("detail.ejs",{data:data});
                }
            });

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