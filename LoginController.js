angular.module('myApp').controller('LoginController', function($scope, $http, AuthenticationServices, $location, $sessionStorage, $rootScope){

 // $rootScope.login=false;
 // $rootScope.sign=false;
 // $rootScope.admin=true;
 // $rootScope.tariff=true;
 // $rootScope.cabdriverdetail=true;
 // $rootScope.booking=true;
 // $rootScope.dribooking=true;
 // $rootScope.logout=true;
 // $rootScope.changepassword=true;
   $scope.login = function(){
     var user = {
       "Email": $scope.User.Email,
       "Password": $scope.User.Password
     };

     AuthenticationServices.Login($scope.User, function(response){
       if(response.data.success == true)
       {
             if (response.data.userDetail.UserType == "customer")
             {
               sessionStorage.setItem('cust_id', response.data.userDetail.Email);
               sessionStorage.setItem('cust_name', response.data.userDetail.FirstName);
               sessionStorage.setItem('cust_type', response.data.userDetail.UserType);
               sessionStorage.setItem('cust_mob', response.data.userDetail.ContactNo);

                  $location.path('/booking');

                  $rootScope.admin=true;
                  $rootScope.login=true;
                  $rootScope.sign=true;
                  $rootScope.tariff=true;
                  $rootScope.cabdriverdetail=true;
                  $rootScope.booking=false;
                  $rootScope.dribooking=true;
                  // $rootScope.unauth=true;
                  $rootScope.logout=false;
                  $rootScope.changepassword=false;
                  $rootScope.user=false;
                  $rootScope.custname=response.data.userDetail.FirstName;
              }
              else if(response.data.userDetail.UserType == "Driver")
               {
                 sessionStorage.setItem('dri_id', response.data.userDetail.Email);
                 sessionStorage.setItem('dri_name', response.data.userDetail.FirstName);
                 sessionStorage.setItem('dri_mob', response.data.userDetail.ContactNo);
                 sessionStorage.setItem('cust_type', response.data.userDetail.UserType);

                  $location.path('/dribooking');

                  $rootScope.admin=true;
                  $rootScope.tariff=true;
                  $rootScope.login=true;
                  $rootScope.sign=true;
                  $rootScope.cabdriverdetail=true;
                  $rootScope.booking=true;
                  $rootScope.dribooking=false;
                  // $rootScope.unauth=true;
                  $rootScope.logout=false;
                  $rootScope.changepassword=false;
                  $rootScope.user=false;
                  $rootScope.custname=response.data.userDetail.FirstName;
              }
              else if(response.data.userDetail.UserType == "admin")
              {
                sessionStorage.setItem('admin_id', response.data.userDetail.Email);
                sessionStorage.setItem('admin_name', response.data.userDetail.FirstName);
                sessionStorage.setItem('cust_type', response.data.userDetail.UserType);

                  $location.path('/');

                  $rootScope.admin=false;
                  $rootScope.tariff=false;
                  $rootScope.login=true;
                  $rootScope.sign=false;
                  $rootScope.cabdriverdetail=false;
                  $rootScope.booking=false;
                  $rootScope.dribooking=false;
                  // $rootScope.unauth=true;
                  $rootScope.logout=false;
                  $rootScope.changepassword=false;
                  $rootScope.user=false;
                  $rootScope.custname=response.data.userDetail.FirstName;
              } else {
                console.log('Invalid User');
              }
     }
     else {
        console.log('No user has logged in');
     }
   });
     $http.post('api/Login', user).then(function(response){
       if(!response.data.success){
         alert(response.data.message);
       }
     });
   }
  //
  //  $scope.DriverLogin = function(){
  //    $http.post('/admin/AddDetails').then(function(response) {
  //        // console.log(response);
  //    });
  //  }
  // $scope.DriverLogin();
});
