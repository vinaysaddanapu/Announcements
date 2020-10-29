const mongoose =  require('mongoose');
const Schema   =  mongoose.Schema;

var announcement = new Schema({

      title: String,
      subject: String,
      date: {type: Date, default: Date.now()},
      description: String,
      isInstant: {type: Boolean, default:false},
      link: String
       
});

module.exports = mongoose.model('announcements',announcement);