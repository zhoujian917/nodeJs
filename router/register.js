/**
 * Created by computeradd on 2017/3/18.
 */
const express = require('express'),
      router = express.Router(),
      mysql = require('../module/mysql'),
    crypto = require('crypto');//密码加密

router.get("/",(req,res)=>{
    res.render("admin/register.ejs");
});
router.post("/",(req,res)=>{
    const name = req.body.username,
        pass = req.body.password,

        md5 = crypto.createHash('md5');//设置加密方式

    mysql("select * from user where username = ?",[name],(err,data)=>{
        if(err){
           return;
        }
        console.log(data.length);
        if(data.length > 0){
           res.send("用户名已经存在!")
        }else{
            newpass = md5.update(pass).digest('hex');//编码格式hex

            mysql("insert into user values (0,?,?,0)",[name,newpass],(err,data)=>{
                if(err){
                    res.render('admin/register.ejs',{data:'出错啦！'});
                    return;
                }
                if(data.affectedRows == 1){
                    res.json({
                        code:0,
                        data:{
                            result:"恭喜您，注册成功!"
                        }
                    });
                }else{
                    res.send("注册失败!");
                    return;
                }
            });
        }
    });
});

module.exports = router;