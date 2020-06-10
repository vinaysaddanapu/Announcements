var conn = require('./db');
var scheduledAnnouncement = require('./models/ScheduleAnnouncements');

exports.update = function(req, res){ 

var updatedRecord = {

    title:req.body.title,
    subject: req.body.subject,
    description: req.body.description,
    link: req.body.link,
    scheduledDate:req.body.date  
}

scheduledAnnouncement.findByIdAndUpdate(req.params.id, {$set:updatedRecord},{"new":true, upsert:false, useFindAndModify:false}, function(err,result){

       if(err){
           res.status(500).send("Internal Server Error");

       }else{
           res.send(result);

       }
})

}

exports.delete = function(req, res){
console.log(req.params.id);
scheduledAnnouncement.findByIdAndRemove(req.params.id,{useFindAndModify:false},function(err, delRecord){

      if(err){
        res.status(500).status("Internal Server Error");

      }else{
        res.send("Record deleted"+ delRecord);
      }
})

}
exports.scheduled = function(req,res)
{
  var currentDate = new Date();
  scheduledAnnouncement.find({scheduledDate:{$gt:currentDate}}).sort({scheduledDate:-1}).exec(function(err,data){
                  
    if(err){
      res.status(500).status("Internal Server Error");

    }else{
      res.send(data);
    }
})
}

exports.findScheduledAnnouncement =  function(req,res){
  console.log(req.params.id);
  scheduledAnnouncement.findById(req.params.id, function(err,data){
      if(err){ 
         console.log(err);
          res.status(500).send("Internal Server Error");
      }else{
          res.send(data);

      }  
  })

}
