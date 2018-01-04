angular.module('myApp').controller('BookingController', function($scope, $http){

  $scope.initMap = function(){

   var map;
   var start = document.getElementById('origin-input');
   start =[];
   // var infowindow = new google.maps.InfoWindow;
   var LatLng = new google.maps.LatLng(28.5733, 77.2219);
   // var geocoder = new google.maps.Geocoder();
   var geocoder, location1, location2;

   infoWindow = new google.maps.InfoWindow;

   map = new google.maps.Map(document.getElementById('map'),{
      zoom : 15,
      center : LatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   // // start.push("h");
   // // document.getElementById('origin-input').value = start[0];
   // // console.log(start[0]);
    var image = {
      url: '../public/images/p_logo.png',
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(50, 40)
    };

    var marker = new google.maps.Marker({
    position: LatLng,
    icon: image,
    map: map,
    draggable:true,
    title: "Your Pickup Location"
   });


   google.maps.event.addListener(marker, 'dragend', function(event, geocoder, map, infowindow){
     document.getElementById('lat').value = event.latLng.lat();
     document.getElementById('long').value = event.latLng.lng();
     start.push(document.getElementById('lat').value = event.latLng.lat(), document.getElementById('long').value= event.latLng.lng());
     // document.getElementById('origin-input').value = start;
     console.log(start);
     var latlng = {lat: parseFloat(start[0]), lng: parseFloat(start[1])};
     start.length=0;
     var geocoder = new google.maps.Geocoder();
     geocoder.geocode({'location': latlng}, function(results, status){
       if(status === 'OK'){
         if(results[0]){
           // map.setZoom(10);
           var marker = new google.maps.Marker({
           position: start,
           icon: image,
           map: map,
           draggable:true,
          });
          // var infowindow = new google.maps.InfoWindow;
          // infowindow.setContent(results[0].formatted_address);
          //     infowindow.open(map, marker);
              document.getElementById('origin-input').value = results[0].formatted_address;
         } else {
           window.alert('No results found');
         }
       } else {
         window.alert('Geocoder failed due to: ' + status);
       }
     });
   });


    var input = document.getElementById('destination-input');
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        // var markers = [];
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // markers.forEach(function(marker) {
          //   marker.setMap(null);
          // });
          // markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            // var image = {
            //   url: '../public/images/cab.png',
            //   size: new google.maps.Size(71, 71),
            //   origin: new google.maps.Point(0, 0),
            //   anchor: new google.maps.Point(17, 34),
            //   scaledSize: new google.maps.Size(80, 60)
            // };
            //
            // markers.push(new google.maps.Marker({
            //   map: map,
            //   icon: image,
            //   title: place.name,
            //   position: place.geometry.location
            // }));

            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
          // var infowindow = new google.maps.InfoWindow({
          //   content: places
          // });
          //
          // google.maps.event.addListener('click', function(){
          //   infowindow.open(map);
          // });

        });

        var directionService = new google.maps.DirectionsService;
        var directionDisplay = new google.maps.DirectionsRenderer({
          map: map
          // panel: document.getElementById('panel_details')
        });

        directionDisplay.setMap(map);

        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionService, directionDisplay);
        };

        document.getElementById('mybtn').addEventListener('click', onChangeHandler);
        // document.getElementById('mybtn').addEventListener('click', getDistance);

        function calculateAndDisplayRoute(directionService, directionDisplay) {
            directionService.route({
              origin: document.getElementById('origin-input').value,
              destination: document.getElementById('destination-input').value,
              travelMode: 'DRIVING'
            }, function(response, status) {
              if (status === 'OK') {
                directionDisplay.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
           }

           // function showDistance(){
           //   geocoder.getLocations(document.getElementById('origin-input').value, function(response){
           //     if(!response || response.Status.code != 200){
           //       alert("h");
           //     } else {
           //       location1 = {lat: response.Placemark[0].Point.coordinates[1],}
           //     }
           //   });
           // }
}

        $scope.Userdetail = function(){
          var custid = sessionStorage.getItem('cust_id');
          var custname = sessionStorage.getItem('cust_name');
          var custmob = sessionStorage.getItem('cust_mob');
          $http.get('/user/GetBooking').then(function(response){
          });
        }
        $scope.Userdetail();

        $scope.UserBooking = function(){
          $http.post('/user/BookingDetails').then(function(response){

          });
        }

});
