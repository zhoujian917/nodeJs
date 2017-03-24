/**
 * Created by computeradd on 2017/3/14.
 */
const  mysql = require('mysql');

module.exports = function(sql,params,cb) {
    let config = mysql.createConnection({
        host: "localhost",
        username: "root",
        password: "",
        port: "3306",
        database: "test"
    })
    config.connect();
    config.query(sql,params, (err, data)=> {
        console.log(data);
        cb&&cb(err,data);
    });
    config.end();
}
