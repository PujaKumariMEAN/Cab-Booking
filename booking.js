var express = require('express');
var router = express.Router();
var UserBooking = require('../models/dbooking.js');

router.post('/BookingDetails', function(req, res){
  var NewUserBooking = new UserBooking({
    CustName: req.body.CustName,
    CustEmail: req.body.CustEmail,
    CustMobile: req.body.CustMobile,
    PickupLoc: req.body.PickupLoc,
    DestinationLoc: req.body.DestinationLoc,
    CabType: req.body.CabType,
    Distance: req.body.Distance,
    Time: req.body.Time,
    Fare: req.body.Fare,
    DriverName: req.body.DriverName,
    DriverEmail: req.body.DriverEmail,
    DriverMob: req.body.DriverMob,
    VehicleNo: req.body.VehicleNo,
    BookingDate: req.body.BookingDate,
    BookingStatus: req.body.BookingStatus,
    PickupDate: req.body.PickupDate
  });

  NewUserBooking.save(function(err, data){
    if(err){
      throw err;
    } else {
      console.log('Record of User Booking');
      res.end();
    }
  });
});

router.get('/GetBooking', function(req, res){
    UserBooking.find({}, function(err, data){
      if(err){
        throw err;
      } else {
        res.end();
      }
    });
});
module.exports = router;
