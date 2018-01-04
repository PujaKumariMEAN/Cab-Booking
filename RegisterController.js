angular.module('myApp').controller('RegisterController', function($scope, $http, $location){

  $scope.submitForm = function(isValid) {
    // check to make sure the form is completely valid
    if (isValid) {
      alert('our form is amazing');
    }
  };

  $scope.SaveUser = function(){
  var user = {
    "FirstName": $scope.User.FirstName,
    "LastName": $scope.User.LastName,
    "Contact": $scope.User.ContactNo,
    "Email": $scope.User.Email,
    "Password": $scope.User.Password,
    "UserType": "customer"
  };
// console.log(user.FirstName);
    $http.post('/api/AddUser', user).then(function(response){
      console.log('Data Saved Successfully');
      if(response.data.success== true){
        alert('User is Registered');
        $location.path('/login');
      }
    });
  }
});
