/**
 * Created by computeradd on 2017/3/18.
 */
const http = require('http'),
    express = require('express'),
    app = express();

//ejs使用设置
app.set("views",__dirname+"/views");
app.set("view engine","ejs");

//设置静态文件路径
app.use(express.static(__dirname+"/public"));


app.use("/",require('./router/index'));

http.createServer(app).listen(3000);

