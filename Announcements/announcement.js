const mongoose =  require('mongoose');
const Schema   =  mongoose.Schema;

var announcement = new Schema({

      title: String,
      subject: String,
      date: {type:Date, default: new Date()},
      description: String,
      tags:[{type:String, ref:'tags'}],
      link: String,
      image: String
});

module.exports = mongoose.model('announcements',announcement);
