/**
 * Created by computeradd on 2017/3/18.
 */
const express = require('express'),
       router = express.Router(),
      mysql = require('../module/mysql');

router.get("/",(req,res)=>{
    res.render("index.ejs");
});

router.use("/register",require('./register'));
router.use("/login",require('./login'));

module.exports = router;