var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var DriCabDetails = require('../models/dcab.js');

router.post('/AddDetails' ,function(req, res){
  var NewDriCabDetails = new DriCabDetails({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Address: req.body.Address,
    Contact: req.body.Contact,
    Email: req.body.Email,
    License: req.body.License,
    CabType: req.body.CabType,
    CabNo: req.body.CabNo,
    CabModel: req.body.CabModel,
    RegNo: req.body.RegNo
  });

  NewDriCabDetails.save(function(err, data){
    if(err){
      throw err;
    } else {
      console.log('Added Successfully');
      res.end();
    }
  });
});

router.get('/GetDetails', function(req , res){
    DriCabDetails.find({}, function(err, data){
      if (err) {
        throw err;
      } else {
        res.json(data);
        // console.log(data);
      }
    });
});

router.get('/GetCab/:id', function(req, res){
  DriCabDetails.find({
    Email : req.params.id
  }, function(err, data){
    if(err){
      throw err;
    } else {
      res.json(data);
      console.log(data);
      console.log(req.params.id);
    }
  });
});

router.put('/UpdateDetails/:id', function(req, res){
  DriCabDetails.findOneAndUpdate({
    _id : req.params.id
  },{
    Address: req.body.Address,
    Contact: req.body.Contact,
    Email: req.body.Email,
    CabType: req.body.Cab,
    CabNo: req.body.CabNo,
    CabModel: req.body.CabModel,
    RegNo: req.body.Reg
  }, function(err, data){
    if(err){
      throw err;
    } else {
      console.log('Record Updated'+JSON.stringify(req.params.id));
      res.end();
    }
  });
});

router.delete('/DeleteDetails/:id', function(req,res){
  DriCabDetails.remove({
    _id : req.params.id
  }, function(err, data){
    if(err){
      throw err;
    } else {
      console.log('Record Deleted Successfully'+JSON.stringify(req.params.id));
      res.end();
    }
  });
});

module.exports = router;
