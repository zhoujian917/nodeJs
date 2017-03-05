/**
 * Created by computeradd on 2017/3/5.
 */
var http = require('http');

http.createServer(function(req,res){
    console.log('http server.....');
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1>http server</h1>');
    res.end();
}).listen(3000);