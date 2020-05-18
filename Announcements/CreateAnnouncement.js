var conn = require('./db');
var mongoose = require('mongoose');
var dateformat = require('dateformat');
var announcement = require('./announcement');
var fs  =  require('fs');
var jwt = require('jsonwebtoken');

exports.announce = function(req, res){

  jwt.verify(req.token,'secretkey',(err,userdata)=>{
        
    if(err){
      res.sendStatus(403);
      console.log(err);
  }else{
      if(req.file){
          var image = req.file.path;
          var url = image.split('\\');
          var imageurl = "http://localhost:8081/"+url[1]; 
          announcement.insertMany({title:req.body.title,description:req.body.description,subject: req.body.subject,link:req.body.link,image: imageurl,tags:req.body.tags},function(err,data){
              if(err){
                  console.log(err);
                  res.status(500).send("Internal server error ")
              }else{
                  res.send(data);
              }
          });

      }else{
          announcement.insertMany({title:req.body.title,description:req.body.description,subject: req.body.subject,link:req.body.link,tags:req.body.tags},function(err,data){
              if(err){
                  console.log(err);
                  res.status(500).send("Internal server error ")
              }else{
                  res.send(data);
              }
          });
      }  
    }
  });

}

exports.getAnnouncement = function(req,res){
  announcement.find({}, function(err, records){

    if(err){
      res.status(500).send("Internal Server Error");
    
    }else{
      //console.log(records);
        res.send(records);
    }


  });

}

exports.getAnnouncementById =  function(req,res){
  console.log(req.params.id);
  announcement.findById(req.params.id,(function(err,data){
      if(err){
        
          console.log(err);
          res.status(500).send("Internal Server Error");
      }else{
          res.send(data);

      }  
  }));

}


