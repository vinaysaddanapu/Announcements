const mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/announcements', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = conn;