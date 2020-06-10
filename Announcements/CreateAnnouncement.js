var conn=require('./db');
var announcement = require('./models/announcement');
var jwt = require('jsonwebtoken');
var scheduleAnnouncement=require('./models/ScheduleAnnouncements');
var notification = require('./pushNotification');

exports.announce = function(req, res){
console.log("in annouce");
  jwt.verify(req.token,'secretkey',(err,userdata)=>{
        
    if(err){
      res.sendStatus(403);
      console.log(err);
  }else{
      if(req.file){
        if(req.body.scheduledTime){
          var image = req.file.path;
          var url = image.split('\\');
          var imageurl = "http://localhost:8081/"+url[1];
          var tag = JSON.parse(req.body.tags); 
          scheduleAnnouncement.insertMany({title:req.body.title,description:req.body.description,subject: req.body.subject,link:req.body.link,image: imageurl,tags:tag, date:Date(), scheduledDate:req.body.scheduledTime, isScheduled:true},function(err,data){
              if(err){
                  console.log(err);
                  res.status(500).send("Internal server error ")
              }else{
                  res.send(data);
              }
          });

      }else{
          var image = req.file.path;
          var url = image.split('\\');
          var imageurl = "http://localhost:8081/"+url[1]; 
          var tag = JSON.parse(req.body.tags);
          console.log(req.body.scheduledTime);
          announcement.insertMany({title:req.body.title,description:req.body.description,subject: req.body.subject,link:req.body.link,tags:tag, image:imageurl, isScheduled:false,date:Date()},function(err,data){
              if(err){
                  console.log(err);
                  res.status(500).send("Internal server error ")
              }else{
                var payload={
                  notification :{
                    title:req.body.title,
                    body:req.body.description
                }
              }
              notification.pushNotification(payload);
              console.log("notification called");
                  res.send(data);

              }
          });
      } 

    }else{
      if(req.body.scheduledTime){
        var tag = JSON.parse(req.body.tags);
        console.log(req.body.scheduledTime);
        scheduleAnnouncement.insertMany({title:req.body.title, description:req.body.description,subject:req.body.subject, link:req.body.link,tags:tag, date:Date(),scheduledDate:req.body.scheduledTime,isScheduled:true,image:null}, function(err, data){
          if(err){
            console.log(err);
            res.status(500).send("Internal server error")
          }else{
            res.send(data);
          }

        }); 
      }else{
        var tag = JSON.parse(req.body.tags);
        announcement.insertMany({title:req.body.title, description:req.body.description, subject:req.body.subject, link:req.body.link,tags:tag, image:null, isScheduled:false,date:Date()}, function(err, data){
           if(err){
             console.log(err);
             res.status(500).send("Internal server error");

           }else{
             var payload={
               notification:{
                 title:req.body.title,
                 body:req.body.description
               }
             }
             notification.pushNotification(payload);
             console.log("notification called");
             res.send(data);
           }

        });
       }

      }

    }
  });

}

exports.getAnnouncement = function(req,res){
  jwt.verify(req.token, 'secretkey',(err,userdata)=>{
    if(err){
      res.sendStatus(403);
      console.log(err);
    }else{
      console.log("in success");
       var currentTime = new Date();

       announcement.find({$or:[{isScheduled:false},{date: { $lte: currentTime }}]}).sort({date:-1}).exec(function(err,records){
        if(err){
          console.log(err);
          res.status(500).send("Internal Server Error");

        }else{

        res.send(records);
        }
    });
  }
  
  })
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

exports.findAnnouncementByTags = function(req, res){
  jwt.verify(req.token,'secretkey', (err, userdata)=>{
      if(err){
      res.sendStatus(403);
      console.log(err);
      }else{
        var tag = JSON.parse(req.params.tags);
        var currentTime = new Date();
        announcement.find({$and:[{tags:{$in : tag}},{$or:[{isScheduled:false},{date: { $lte: currentTime }}]}]}).sort({date:-1}).exec(function(err, data){
        if(err){
          console.log(err);
          res.sendStatus(500).send("Internal server error");
        }else{
          res.send(data);
        }

        });

     }
  })

}


