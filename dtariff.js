var mongoose = require('mongoose');
var CabSchema = mongoose.Schema({
  CabType: String,
  NormalRate: Number,
  PeakRate: Number,
  StartPeak: String,
  EndPeak: String
});

module.exports =  mongoose.model('CabDetail', CabSchema , 'cabdetails');
