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

//upload.single 用来接收1个文件
router.post('/',upload.single('imgTo'),(req,res) => {
    console.log(req.body);
    const tag = req.body.tag.join(','),
        title = req.body.title,
        author = req.body.author,
        content = req.body.editorValue,
        img = '/upload/' + req.file.filename,
        time = new Date().toLocaleString().substring(0,10);
    console.log(tag);
    console.log(req.upload); // 限制上传 {}
     mysql('insert into artical values (0,?,?,?,?,?,?)',
     [title,tag,time,author,img,content],(err,data) => {
     if(err){
         res.send('保存失败');
          return
     }
     res.json({
     result:'保存成功'
     })
     });
});
module.exports = router;