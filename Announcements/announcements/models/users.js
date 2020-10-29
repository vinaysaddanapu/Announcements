const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/announcements', {useNewUrlParser: true, useUnifiedTopology: true});

var user = new Schema({

    name:String,
    email_id: String,
    password: String,
    isAdmin: Boolean
    
 
});
module.exports = mongoose.model('User',user);