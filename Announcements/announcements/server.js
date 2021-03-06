var announcements = require('./CreateAnnouncement');
var express = require('express');
var app = express();
var tagsController = require('./TagsController');
var updateAnnouncement = require('./UpdateAnnouncement');
var User = require('./models/users');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var webpush = require('web-push');
var path = require('path');
var deviceTokenController = require('./tokenController');

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
app.post('/devicetoken',deviceTokenController.deviceTokens);
app.get('/getdevicetokens',deviceTokenController.getTokens);
app.post('/login', function(req,res){
var uname = req.body.email_id;
var pass =  req.body.password;
console.log("username "+uname);
console.log("password  "+pass);
User.findOne({email_id:uname, password:pass}, function(err, result){

    if(err){
     res.status(500).send("Internal server Error");
    }else{
        if(result){
          console.log("in result");
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
            res.status(404).send('User not found');
        }
    }

});

});

function verifyToken(req,res, next){
console.log("in verifytoken");
    const barearHeader = req.headers['authorization'];
    console.log("in barearHeader"+barearHeader);
      if( typeof barearHeader !== 'undefined'){

          const barear = barearHeader.split(' ');
           const barearToken = barear[1];
           req.token = barearToken;
           next();
      } else{
        res.sendStatus(403);
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

app.get('/getAll', verifyToken, announcements.getAnnouncement);

app.get('/announcement/:id', announcements.getAnnouncementById);

app.get('/announcementbytags/:tags', verifyToken, announcements.findAnnouncementByTags);

app.get('/userintags/:userid', verifyToken, tagsController.findUserInTags);

app.put('/update/:id', updateAnnouncement.update);

app.delete('/delete/:id', updateAnnouncement.delete);

app.get('/scheduled',updateAnnouncement.scheduled);

app.get('/getScheduled/:id',updateAnnouncement.findScheduledAnnouncement);

var schduler=require('./JobScheduler');
schduler.scheduler()

app.listen(8081,()=>{

    console.log("Server started listening on port 8081");
});

