/**
 * Created by computeradd on 2017/3/18.
 */
const http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');
    app = express(),
        mysql = require('./module/mysql'),
        session = require('express-session');

//ejs模板设置
app.set("views",__dirname+"/views");
app.set("view engine","ejs");

//post方法提交的设置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//设置静态资源路径
app.use(express.static(__dirname+"/public"));

//cookies 设置密钥
app.use(cookieParser('zhoujian'));
//session设置密钥
app.use(session({secret:'zhoujian'}));

app.use(function(req,res,next){

    if(req.cookies['login']){
        res.locals.login = req.cookies.login.name;
    }

    // 继续往下执行
    next();

})

app.use("/",require('./router/index'));

http.createServer(app).listen(8888);

