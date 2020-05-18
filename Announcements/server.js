var announcements = require('./CreateAnnouncement');
var express = require('express');
var app = express();
var conn =require('./db');
var User = require('./users');
var Tags = require('./tags');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');

app.use(function(req, res, next) {
    // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('uploads'));
app.use(cors());
  
app.post('/login', function(req,res){

var uname = req.body.email_id;
var pass =  req.body.password;

User.findOne({email_id:uname, password:pass}, function(err, result){

    if(err){
     res.status(500).send("Internal server Error");
    }else{
        if(result){
            if(result.isAdmin){
                jwt.sign({result}, 'secretkey',(err, token)=>{
                  res.send({
                    id:result._id,  
                    name:result.name,
                    email_id:result.email_id,
                    isAdmin:result.isAdmin,
                    token:token

                  })

                })

            }else{
                res.send({
                    id:result._id,
                    name:result.name,
                    email_id:result.email_id,
                    isAdmin:result.isAdmin

                })
            }

        }else{
            res.status(404).send('User not found');
        }
    }

});

});

function verifyToken(req,res, next){

    const barearHeader = req.headers['authorization'];
      if( typeof barearHeader !== 'undefined'){

          const barear = barearHeader.split(' ');
           const barearToken = barear[1];
           req.token = barearToken;
           next();
      } else{
          res.send(403);
      }
}

const multer = require('multer');
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
// SET STORAGE FOR IMAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ 
      storage: storage ,
      fileFilter:fileFilter
    })


app.post('/announcement',verifyToken,upload.single('image'),announcements.announce);

app.get('/getAll',  verifyToken, announcements.getAnnouncement);

app.get('/announcement/:id', announcements.getAnnouncementById);

app.get('/tags', function(req, res){
 
 Tags.find({},function(err, tags){
     if(err){
         res.status(403).send("Error in getting Tags");
     }else{
         res.send(tags);
     }
 });

});


app.listen(8081,()=>{

    console.log("Server started listening on port 8081");
});



