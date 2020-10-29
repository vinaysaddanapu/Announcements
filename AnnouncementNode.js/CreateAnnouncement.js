var express = require('express');
var app = express();
var conn = require('./db');
var announcement = require('./announcement');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

exports.announce = function(req, res){

  var newAnnouncement = new announcement({

    title: req.body.title,
    subject: req.body.subject,
    description: req.body.description,
    link: req.body.link

  })

    newAnnouncement.save(function(err, result){
     
        if(err){
         res.status(500).send("Internal Server Error");

        }else{
        return res.send(result);
        }

    });

}

