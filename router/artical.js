/**
 * Created by computeradd on 2017/3/27.
 */
const express = require('express'),
      router = express.Router(),
    mysql = require('../module/mysql'),
    upload = require('../module/multer');

router.get("/",(req,res)=>{
    mysql("select * from tag",(err,tagdata)=>{
        if(err){
           console.log("select tag err");
            return;
        }
        if(tagdata.length > 0){
            res.render("admin/articals.ejs",{tagdata:tagdata});
        }
    });

});

//                     upload.single 用来接收1个文件
router.post('/article',upload.single('imgTo'),(req,res) => {
    console.log(req.body);
    console.log(req.upload); // 限制上传 {}
   /* let title = req.body.title,
     tag = req.body.tag,
     author = req.body.author,
     content = req.body.content,
     img = '/img/' + req.file.filename,
     time = new Date().toLocaleString().substring(0,10);
     sql('INSERT INTO article (id,title,tag,author,content,time,img) VALUES (0,?,?,?,?,?,?)',
     [title,tag,author,content,time,img],(err,data) => {
     if(err){
     res.send('保存失败');
     return
     }
     res.json({
     result:'保存成功'
     })
     });*/
});
module.exports = router;