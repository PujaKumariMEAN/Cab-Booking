var express = require('express');
var router = express.Router();
var Tariff = require('../models/dtariff.js');

router.post('/AddTariff', function(req, res){
  var NewTariff = new Tariff({
    CabType: req.body.Cab,
    NormalRate: req.body.Normal,
    PeakRate: req.body.Peak,
    StartPeak: req.body.SPeak,
    EndPeak: req.body.EPeak
  });

  NewTariff.save(function(err, data){
    if(err){
      throw err;
    } else {
      console.log('Added Successfully');
      res.end();
    }
  });
});

router.get('/GetTariff1' , function(req, res){
   Tariff.find({}, function(err, data){
     if(err){
        throw err;
     } else {
       res.json(data);
       // console.log(data);
     }
   });
});

router.put('/UpdateTariff/:id', function(req,res){
  // console.log('h');
  Tariff.findOneAndUpdate({
    _id: req.params.id
  }, {
    NormalRate: req.body.NormalRate,
    PeakRate: req.body.PeakRate,
    StartPeak: req.body.StartPeak,
    EndPeak: req.body.EndPeak,
  }, function(err, data){
      if(err){
        throw err;
      }
      else {
          console.log('Record Updated'+JSON.stringify(req.params.id));
        // res.json(data);
        res.end();
      }
    });
  });

router.delete('/DeleteTariff/:id', function(req, res){
  Tariff.remove({
    _id: req.params.id
  }, function(err, data){
    if(err){
      throw err;
    } else{
      console.log('Record remove Successfully'+JSON.stringify(req.params.id));
      res.end();
    }
  });
  // console.log(req.body);
});

module.exports = router;
