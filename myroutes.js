var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var User = require('../models/user.js');

router.post('/AddUser' , function(req, res){
  var NewUser = new User ({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    ContactNo: req.body.Contact,
    Email: req.body.Email,
    Password: bcrypt.hashSync(req.body.Password),
    UserType: req.body.UserType
  });

  NewUser.save(function(err, data){
    if (err) {
            throw err;
        } else {
            console.log('Added Successfully');
             res.end();
        }
  });
});

router.post('/Login', function(req, res){
 User.findOne({
   Email: req.body.Email },
     function(err,data) {
    if (err){
       res.json(err);
    } else if (!data) {
       res.json({
         success: false,
         message: 'Sorry! Please enter correct Email Id'
       });
       console.log('Wrong Email Id');
    } else if(!bcrypt.compareSync(req.body.Password, data.Password)){
      res.json({
        success: false,
        message:'Password is not correct. Please enter the correct password'
      });
      console.log('Incorrect Password');
    }
    else {
       console.log('Email Id and Password is correct');
       var token = jwt.sign(data.toObject(), 'thisismysecret' , {
       expiresIn: 1440
     });
     res.json({
       success: true,
       message: 'Correct Details',
       isLoggedIn: true,
       token: token,
       userDetail: data
     });
     console.log(token);
     console.log('Token Created');
    }

});
});

module.exports = router;
