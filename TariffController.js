angular.module('myApp').controller('TariffController', function($scope, $http) {

    $scope.SaveTariff = function() {
      var s = document.getElementById('start').value;
      var e = document.getElementById('end').value;
      var tariff = {
                       "Cab": $scope.Tariff.Cab ,
                       "Normal": $scope.Tariff.Nrate ,
                       "Peak": $scope.Tariff.Prate,
                       "SPeak": s,
                       "EPeak": e
        };
        $http.post('/show/AddTariff',tariff).then(function(response) {
            console.log('Data Saved Successfully');
            // console.log(tariff);
        });
    }

    $scope.GetTariff = function()
    {
      $http.get('/show/GetTariff1').then(function(response){
       $scope.tDetails = response.data;
       console.log($scope.tDetails);
      });
    }
    $scope.GetTariff();

    $scope.get = function(CabType){
      for(var i = 0; i<$scope.tDetails.length; i++){
        if($scope.tDetails[i].CabType==CabType)
        {
          // console.log($scope.tDetails[i]);
          //sessionStorage.setItem('Cabdetails');
            $scope.t = $scope.tDetails[i]; //sessionStorage.getItem('Cabdetails');
            // console.log($scope.t.CabType);
        }
     }
    }

    $scope.UpdateRecord = function(id){
        var edit = {
                     "NormalRate": $scope.t.NormalRate,
                     "PeakRate": $scope.t.PeakRate,
                     "StartPeak": $scope.t.StartPeak,
                     "EndPeak": $scope.t.EndPeak
        };
          console.log(edit);
        $http.put('/show/UpdateTariff/'+id, edit).then(function(response){

      });
    }

    $scope.DeleteRecord = function(id){
                console.log(id);
                $http.delete('/show/DeleteTariff/'+id).then(function(response){
                }, function(response){
                     console.log(response);
                });
              }

});
