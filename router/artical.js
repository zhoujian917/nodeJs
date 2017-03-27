/**
 * Created by computeradd on 2017/3/27.
 */
const express = require('express'),
      router = express.Router();
router.get("/",(req,res)=>{
    res.render("admin/artical.ejs");
});
module.exports = router;