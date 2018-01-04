var mongoose = require('mongoose');
var BookingSchema = mongoose.Schema({
  CustName: String,
  CustEmail: String,
  CustMobile: String,
  PickupLoc: String,
  DestinationLoc: String,
  CabType: String,
  Distance: String,
  Time: String,
  Fare: String,
  DriverName: String,
  DriverEmail: String,
  DriverMob: String,
  VehicleNo: String,
  BookingDate: String,
  BookingStatus: String,
  PickupDate: String
});

module.exports = mongoose.model('bookings', BookingSchema , 'bookings');
