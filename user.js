var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  ContactNo: Number,
  Email: String,
  Password: String,
  UserType: String
});


module.exports = mongoose.model('userdetails', UserSchema, 'userdetails');
