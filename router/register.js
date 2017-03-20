/**
 * Created by computeradd on 2017/3/18.
 */
const express = require('express'),
      router = express.Router(),
      mysql = require('../module/mysql');

router.get("/",(req,res)=>{
    console.log("register router");
    res.render("register");
});
router.post("/",(req,res)=>{

});
module.exports = router;