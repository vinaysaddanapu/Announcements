const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var scheduledAnnouncement=new Schema({
    title:String,
    description:String,
    subject:String,
    link:String,
    image:String,
    tags:[{type:String, ref:'Tags'}],
    date:Date,
    isScheduled:{type:Boolean,default:false},
    scheduledDate:Date

});
module.exports = mongoose.model("ScheduledAnnouncement",scheduledAnnouncement);