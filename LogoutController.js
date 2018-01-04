angular.module('myApp').controller('LogoutController', function($scope, AuthenticationServices, $http, $sessionStorage, $rootScope, $location){

  $scope.logout = function(){
    AuthenticationServices.Logout($scope.User, function(response){

    });
    sessionStorage.clear();
    $rootScope.login=false;
    $rootScope.sign=false;
    $rootScope.admin=true;
    $rootScope.tariff=true;
    $rootScope.cabdriverdetail=true;
    $rootScope.booking=true;
    $rootScope.dribooking=true;
    $rootScope.logout=true;
    $rootScope.changepassword=true;
    $rootScope.user=true;
    $location.path('/');
  }
  $scope.logout();
});
