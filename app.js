/**
 * Created by computeradd on 2017/3/18.
 */
const http = require('http'),
    express = require('express'),
    app = express();

//ejsʹ������
app.set("views",__dirname+"/views");
app.set("view engine","ejs");

//���þ�̬�ļ�·��
app.use(express.static(__dirname+"/public"));


app.use("/",require('./router/index'));

http.createServer(app).listen(3000);

