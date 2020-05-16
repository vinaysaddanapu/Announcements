var conn = require('./db');
var announcement = require('./announcement');
var fs  =  require('fs');
var jwt = require('jsonwebtoken');

exports.announce = function(req, res){

  var newAnnouncement = new announcement({

    title: req.body.title,
    subject: req.body.subject,
    description: req.body.description,
    link: req.body.link,
    image:req.file.path,
    tags: req.body.tags
    
  })

  jwt.verify(req.token,'secretkey',(err,userdata)=>{
        if(err){
         res.sendStatus(403);
         console.log(err);
        }else{
          newAnnouncement.save(function(err, result){
            if(err){
              console.log(err);
            }else{             
            return res.send(result);
            }
          });
        
        }
  });

}

exports.getAnnouncement = function(req,res){

  announcement.find({}, function(err, records){

    if(err){
      res.status(500).send("Internal Server Error");
    
    }else{
      //console.log(records);
       return res.send(records);
    }


  });

}

