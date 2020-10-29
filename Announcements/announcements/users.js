const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/announcements', {useNewUrlParser: true, useUnifiedTopology: true});

var user = new Schema({

    username:String,
    email: String,
    mobile_number:Number,
    isAdmin: Boolean,
    password: String
 
});
module.exports = mongoose.model('User',user);