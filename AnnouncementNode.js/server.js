var announcements = require('./CreateAnnouncement');
var express = require('express');
var app = express();
var conn =require('./db');
var User = require('./users');
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
  
app.post('/login', function(req,res){

var uname = req.body.email_id;
var pass =  req.body.password;

User.findOne({email_id:uname, password:pass}, function(err, result){

    if(err){
     res.status(500).send("Internal server Error");
    }
    if(result){

    res.send(result);

    }else{
        res.status(404).send("User not found");
    }

});

});


app.post('/announcement', announcements.announce);

app.listen(8081,()=>{

    console.log("Server started listening on port 8081");
});



