var mongoose = require('mongoose');
var CabDetailsSchema = mongoose.Schema({
FirstName: String,
LastName: String,
Address: String,
Contact: Number,
Email: String,
License: String,
CabType: String,
CabNo: String,
CabModel: String,
RegNo: String
});

module.exports = mongoose.model('dricabdetails', CabDetailsSchema , 'dricabdetails');
