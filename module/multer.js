const multer = require('multer'),
    path = require('path');

//  上传路径处理 上传之后重命名
let storage = multer.diskStorage({
    // 上传路径处理
    destination: path.join(process.cwd(),'public/upload'),
    filename:function (req,file,callback){
        console.log("fliename:::"+file);
        let filename = (file.originalname).split(".");
        callback(null, `${Date.now()}.${filename[filename.length-1]}` )
    }
});
let fileFilter = function (req,file,cb){
    // 当设置这个判断后  没允许的 && 没设置的类型 拒绝
    if(file.mimetype === 'png/jpg'){
        cb(null,true)
    }else{
        req.upload = '123';
        cb(null,false)
    }
};
let upload = multer({
    storage:storage,
    limits:{
        // 限制上传文件的大小
    },
   // fileFilter:fileFilter
});
module.exports = upload;
