var express = require('express');
var app = express();
var User = require('./users');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/login', function(req,res){

var uname = req.body.username;
var pass =  req.body.password;

User.findOne({username:uname, password:pass}, function(err, result){

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
app.listen(8081,()=>{

    console.log("Server started listening on port 8081");
});



