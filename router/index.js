/**
 * Created by computeradd on 2017/3/18.
 */
const express = require('express'),
       router = express.Router(),
      mysql = require('../module/mysql');

router.get("/",(req,res)=>{
    res.locals.admin = req.session.admin;
    res.render("index.ejs");
});
//博客
router.get("/blog_post",(req,res)=>{
    res.render("blog_post.ejs")
});
//
router.get("/gallery",(req,res)=>{
    res.render("gallery.ejs");
});
//关于我
router.get("/about",(req,res)=>{
    res.render("about.ejs");
});
//联系我
router.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});
router.get("/logout",function(req,res){
    res.clearCookie('login');
    res.redirect("/");
});
router.use("/search",require('./search'));
router.use("/register",require('./register'));
router.use("/login",require('./login'));

module.exports = router;