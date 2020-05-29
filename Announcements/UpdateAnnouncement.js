var conn = require('./db');
var announcement = require('./announcement');

exports.update = function(req, res){ 

var updatedRecord = {

    title:req.body.title,
    subject: req.body.subject,
    description: req.body.description,
    link: req.body.link
}

announcement.findByIdAndUpdate(req.params.id, {$set:updatedRecord},{"new":true, upsert:false, useFindAndModify:false}, function(err,result){

       if(err){
           res.status(500).send("Internal Server Error");

       }else{
           res.send("Updated record:" +result);

       }
})

}

exports.delete = function(req, res){
console.log(req.params.id);
announcement.findByIdAndRemove(req.params.id,{useFindAndModify:false},function(err, delRecord){

      if(err){
        res.status(500).status("Internal Server Error");

      }else{
        res.send("Record deleted"+ delRecord);
      }
})

}