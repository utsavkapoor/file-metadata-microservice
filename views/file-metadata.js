'use strict'

var multer = require('multer');
var fs = require('fs');
var path = require('path');
var Storage = multer.diskStorage({
  destination:function(req,file,callback){
    callback(null,'upload/');
    
  },
  filename:function(req,file,callback){
    //console.log(file);
    callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }

  });

var Upload = multer({
    storage:Storage
  }).single('Upload')

module.exports = function(req,res,next){

  
  Upload(req, res, function(err) {
		if(err) throw err;
    if(req.file){
        var obj= {
    name:req.file.originalname,
    size:req.file.size,
    date: new Date().toLocaleString(),
  }
console.log(req.file.filename);
  var filepath = './upload/' + req.file.filename;
  fs.unlinkSync(filepath);
  res.send(obj);
    } else {
      res.status(404).send("No file found");
    }

  });

}