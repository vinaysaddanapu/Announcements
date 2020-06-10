const cron = require('node-cron');
const notification = require('./pushNotification');

const ScheduledAnnouncements = require('./models/ScheduleAnnouncements');
const Announcements = require('./models/announcement');

exports.scheduler = function(){ cron.schedule("* * * * *",function(){
    console.log("thread runnning .....");

    var currentTime = new Date();
    ScheduledAnnouncements.find({scheduledDate:{$lte:currentTime}},function(err,data){
        if(err){
            console.log(err);
        }else{
            if(data.length>0){
                var dataString = JSON.stringify(data);
                var dataObject = JSON.parse(dataString);
                console.log("Scheduled Announcement Triggered")
                dataObject.forEach(element => {
                    Announcements.insertMany({title:element.title,description:element.description,subject:element.subject,link:element.link,image:element.image,tags:element.tags,isScheduled:true,date:element.scheduledDate},function(err,data1){
                        if(err){
                            console.log(err);
                        }else{
                            
                            console.log(data1);
                            console.log("Data Inserted");
                            var payload ={
                                notification:{
                                    title:element.title,
                                    body:element.description
                                }
                            }
                            notification.pushNotification(payload);
                            console.log("notification called");
                            ScheduledAnnouncements.findByIdAndDelete(element._id,function(err,data2){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log(data2)
                                    console.log("Data Deleted And Added To Announcement");
                                }
                            });
                        }
                    });
                    
                });
       
            }
        }

    });



})

}
