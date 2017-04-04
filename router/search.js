/**
 * Created by computeradd on 2017/3/24.
 */
const express = require('express'),
      router = express.Router(),
    mysql = require('../module/mysql');

router.get("/",(req,res)=> {
    let search =  req.query.id;
    mysql("select * from artical where tid like '%"+search+"%'",(err,data)=>{
        if(err){
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
                            res.locals.res = "success";
                            res.render("item.ejs",{data:data,dataTag:dataTag,dataRec:dataRec});
                        }
                    });

                }
            });

        }else{

            mysql("select * from tag order by id",(err,dataTag)=>{
                if(err){
                    return;
                }
                if(dataTag.length>0){
                    mysql("select * from artical order by id desc limit 0,5",(err,dataRec)=>{
                        if(dataRec.length>0){
                            res.locals.res = "<h3>抱歉，暂无该类文章</h3>";
                            res.render("item.ejs",{dataTag:dataTag,dataRec:dataRec});
                        }
                    });

                }
            });
        }

    });
});
router.post("/",(req,res)=>{
   let search =  req.body.search;
    console.log(search);
    mysql("select * from artical where tid like '%"+search+"%'",(err,data)=>{
        if(err){
            return;
        }
        if(data.length>0){
            console.log(data);
            mysql("select * from tag order by id",(err,dataTag)=>{
                if(err){
                    return;
                }
                if(dataTag.length>0){
                    mysql("select * from artical order by id desc limit 0,5",(err,dataRec)=>{
                        if(dataRec.length>0){
                            res.locals.res = "success";
                            res.render("item.ejs",{data:data,dataTag:dataTag,dataRec:dataRec});
                        }
                    });

                }
            });
            //请求成功去详情页

        }else{
            mysql("select * from tag order by id",(err,dataTag)=>{
                if(err){
                    return;
                }
                if(dataTag.length>0){
                    mysql("select * from artical order by id desc limit 0,5",(err,dataRec)=>{
                        if(dataRec.length>0){
                            res.locals.res = "<h3>抱歉，暂无该类文章</h3>";
                            res.render("item.ejs",{dataTag:dataTag,dataRec:dataRec});
                        }
                    });

                }
            });
        }

    });
});
module.exports = router;