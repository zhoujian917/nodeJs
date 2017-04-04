/**
 * Created by computeradd on 2017/4/4.
 */
const express = require('express'),
      router = express.Router();

router.get("/",(req,res)=>{
    res.render("/");
});
router.post("/",(req,res)=>{
   console.log(req.body);
    if(req.cookies.login.name==undefined){
        res.locals.res="请登录!"
        return;
    }
});

module.exports = router;