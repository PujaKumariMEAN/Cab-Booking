angular.module('myApp').controller('DriBookingController', function($scope, $http, $rootScope){

  $scope.initMap = function(){
  // var LatLng = new google.maps.LatLng(28.5733, 77.2219);
  var map = new google.maps.Map(document.getElementById('drimap'),{
       zoom : 15,
       center : {lat: -34.397, lng: 150.644}
    });
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
          
        var image = {
          url: '../public/images/cab.png',
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(80, 60)
        };

        var socket = io.connect('http://localhost:8000');
        socket.on('my event', function(data){

        });
        var marker = new google.maps.Marker({
          position: pos,
          icon: image,
          map: map
        });
        map.setCenter(pos);
      }, function(){
        handleLocationError(true, marker, map.getCenter());
      });
    } else {
      handleLocationError(false, marker, map.getCenter());
    }
}

    $scope.getCab = function(){
      var d_email=sessionStorage.getItem('dri_id');
      var drivername = sessionStorage.getItem('dri_name');
      var drivercontact = sessionStorage.getItem('dri_mob');
      // console.log(drivercontact);
      // console.log(drivername);
      $http.get('/user/GetBooking').then(function(response){
            $http.get('/admin/GetCab/'+d_email).then(function(response){
                  console.log(d_email);
                  // console.log(response.data);
                  // console.log(response.data[0].CabNo);
                  var cabNo = response.data[0].CabNo;
                  console.log(cabNo);
            });
       });
    }
    $scope.getCab();

});
