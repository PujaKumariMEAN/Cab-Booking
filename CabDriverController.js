angular.module('myApp').controller('CabDriverController', function($scope, $http){

  // console.log(sessionStorage.getItem('dri_id'));

        $scope.submitForm = function(isValid) {
          // check to make sure the form is completely valid
          if (isValid) {
            alert('our form is amazing');
          }
        };
        $scope.SaveDetails = function() {
          var details = {
                      "FirstName": $scope.Driver.FirstName,
                      "LastName": $scope.Driver.LastName,
                      "Address": $scope.Driver.Address,
                      "Contact": $scope.Driver.Contact,
                      "Email": $scope.Driver.Email,
                      "License": $scope.Driver.License,
                      "CabType": $scope.Driver.CabType,
                      "CabNo": $scope.Driver.CabNo,
                      "CabModel": $scope.Driver.CabModel,
                      "RegNo": $scope.Driver.RegNo,

          };

          // console.log('hello');
            $http.post('/admin/AddDetails',details).then(function(response) {
                console.log('Data Saved Successfully');
                // console.log($scope.Driver);
                console.log(details);

                var driver = {
                  "FirstName": $scope.Driver.FirstName,
                  "LastName": $scope.Driver.LastName,
                  "Contact": $scope.Driver.Contact,
                  "Email": $scope.Driver.Email,
                  "Password": "password",
                  "UserType": "Driver"
                };
              //console.log();
                  $http.post('/api/AddUser', driver).then(function(response){
                    console.log('Data Saved Successfully');
                  });
            });
            alert('Record Saved');
        }

        $scope.GetDetails = function()
        {
          $http.get('/admin/GetDetails').then(function(response) {
            $scope.cDetails = response.data;
              console.log($scope.cDetails);
          });
        }
        $scope.GetDetails();

        $scope.get = function(Email){
          for(var i = 0; i<$scope.cDetails.length; i++){
             if($scope.cDetails[i].Email==Email){
                console.log($scope.cDetails[i]);
                $scope.c = $scope.cDetails[i];
                console.log($scope.c.Email);
             }
          }
        }

        $scope.UpdateDetails  = function(id){
          var rec = {
            "Address": $scope.c.Address,
            "Contact": $scope.c.Contact,
            "Email": $scope.c.Email,
            "Cab": $scope.c.CabType,
            "CabNo": $scope.c.CabNo,
            "CabModel": $scope.c.CabModel,
            "Reg": $scope.c.RegNo,
          };
          console.log(rec);
          $http.put('/admin/UpdateDetails/'+id, rec).then(function(response){
            console.log('Updated Successfully');
          });
        }

        $scope.DeleteDetails = function(id)
        {
          console.log(id);
          $http.delete('/admin/DeleteDetails/'+id).then(function(response){
            console.log('Record Deleted Successfully');
          });
          alert('Record Deleted')
        }
});
