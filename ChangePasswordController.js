angular.module('myApp').controller('ChangePasswordController', function($scope, $http, AuthenticationServices, $sessionStorage,  $location){

    $scope.changepassword = function(){

      var cust = sessionStorage.getItem('cust_id');
      var driver = sessionStorage.getItem('dri_id');
      var admin = sessionStorage.getItem('admin_id');

      if(cust!=null)
      {
        $scope.Change.Email = cust;
        console.log(cust);
      }
      else if(driver!=null)
      {
        $scope.Change.Email = driver;
        console.log(driver);
      }
      else if(admin!=null)
      {
        $scope.Change.Email = admin;
        console.log(admin);
      }
      else {
        if(cust!=""||driver!=""||admin!="")
        {

          AuthenticationServices.Login($scope.User, function(response){
            console.log(response);
              if(response.data.invalid!=true){
                $scope.Email = $scope.User.Email;
                
              }
          }

        }
      }
    }

});
