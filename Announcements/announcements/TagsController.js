const Tags = require('./models/tags');
const jwt = require('jsonwebtoken');

exports.findUserInTags = function(req, res){
    console.log(req.token);
     jwt.verify(req.token, 'secretkey',(err,userdata)=>{
         if(err){
             console.log(err);
             res.sendStatus(403);
         }else{
        Tags.find({}, function(err,tags){
                 if(err){
                    console.log(err);
                    res.sendStatus(403);

                 }else{
                   var userTagsList = ["employees"];
                   console.log(typeof req.params.userid);

                   tags[0].techLead.forEach(element => {
                    if(JSON.stringify(element) === req.params.userid){
                        userTagsList.push("techLead");
                    }

                    });

                    tags[0].interns.forEach(element => {
                        if(JSON.stringify(element) === req.params.userid){
                            userTagsList.push("interns");
                        }
                    });

                    res.send(userTagsList);

                    }
        },)

     }

     })
}