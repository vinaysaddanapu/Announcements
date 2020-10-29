const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var tags = new Schema({

      employees:[{type:ObjectId, ref:'User'}],
      interns: [{type:ObjectId, ref:'User'}],
      techLead:[{type:ObjectId, ref:'User'}]

});

module.exports = mongoose.model("tags", tags);
