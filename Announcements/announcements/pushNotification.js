var Token = require('./models/token');
var admin = require("firebase-admin");

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };


var serviceAccount = require('./node_modules/firebase-admin/logindemo-c3341-firebase-adminsdk-ft5sx-64688c624a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://logindemo-c3341.firebaseio.com"
});



exports.pushNotification = function(payload){
    Token.find({},function(err,tokens){
        console.log("tokens "+tokens);
        if(err){
            console.log(err);
        }else{

            console.log("in else ");
            var tokenList = [];
            tokens.forEach(element =>{
                tokenList.push(element.token);
            })
            console.log("tokenlist "+tokenList);
            console.log("payload "+payload)
            const options =  notification_options;
            console.log(payload);
            
              admin.messaging().sendToDevice(tokenList, payload, options)
              .then( response => {
        
               console.log("Notification sent successfully");
               
              })
              .catch( error => {
                  console.log(error);
              });


        }
    })
   

}