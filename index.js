var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var logger = require('morgan');
var mongoose = require('mongoose');
var routes = require('./server/routes/myroutes');
var tariff = require('./server/routes/tariff');
var cab = require('./server/routes/cab');
var user = require('./server/routes/booking');
var bodyParser = require('body-parser');
var path = require('path');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/api', routes);
app.use('/show', tariff);
app.use('/admin', cab);
app.use('/user', user);
app.use(express.static(path.join(__dirname, '/client')));
mongoose.connect('mongodb://localhost/TariffDatabase');

io.on('connection', function(socket){
  console.log('Connected');
  socket.on('my event', function(data){
    socket.broadcast.emit('my other event',{
      
    });
  });
});

server.listen(8000, function(req, res){
  console.log('Server is running at port no 8000');
});
