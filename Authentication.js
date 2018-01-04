angular.module('myApp').service('AuthenticationServices', function($http, $sessionStorage, $cookies, $location){
      this.Login = function(user, callback){
        $http.post('/api/Login', user).then(function(response){
          console.log(response.data);
          if(response.data.success && response.data.token){
            $sessionStorage.tokenDetails = {
              token: response.data.token
            };
            $http.defaults.headers.common.Authorization = response.data.token;
            // var obj = {
            //   currentUser: {
            //     isLoggedIn: true,
            //     userInfo: {
            //       id: response.data.userdetails._id,
            //       email: response.data.userdetails.Email,
            //       fname: response.data.userdetails.FirstName,
            //       lname: response.data.userdetails.LastName,
            //       contact: response.data.userdetails.ContactNo,
            //       usertype: response.data.userdetails.UserType
            //     }
            //   }
            // };
            $cookies.putObject('userCookie', response.data.userdetails);
            callback(response);
            // $location.path('/booking');
          } else {
            callback(response);
          }
        });
      }

      this.Logout = function(){
        delete $sessionStorage.tokenDetails;
        $http.defaults.headers.common.Authorization = '';
        $cookies.remove('userCookie');
      }
});
