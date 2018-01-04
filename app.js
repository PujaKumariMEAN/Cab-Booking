var app = angular.module('myApp', ['ngRoute', 'ngStorage', 'ngCookies']);
app.config(function($routeProvider, $locationProvider)
{
  $routeProvider.when('/', {
    templateUrl: '/views/home.html',
    controller: 'HomeController'
  }).when('/login', {
    templateUrl: '/views/login.html',
    controller: 'LoginController'
  }).when('/register', {
    templateUrl: '/views/register.html',
    controller: 'RegisterController'
  }).when('/tariff',{
    templateUrl: '/views/tariff.html',
    controller: 'TariffController'
  }).when('/cabdriverdetail',{
    templateUrl: '/views/cabdriverdetail.html',
    controller: 'CabDriverController'
  }).when('/booking', {
    templateUrl: '/views/booking.html',
    controller: 'BookingController'
  }).when('/dribooking', {
    templateUrl: '/views/dribooking.html',
    controller: 'DriBookingController'
  }).when('/changepassword', {
    templateUrl: '/views/changepassword.html',
    controller: 'ChangePasswordController'
  }).when('/logout', {
    templateUrl: '/views/logout.html',
    controller: 'LogoutController'
  });
    $locationProvider.hashPrefix('/');
    $locationProvider.html5Mode(true);

});

app.run(function($rootScope, $http, $sessionStorage, $cookies, $location){

var cust = sessionStorage.getItem('cust_id');
var custname1 = sessionStorage.getItem('cust_name');
var driver = sessionStorage.getItem('dri_id');
var drivername1 = sessionStorage.getItem('dri_name');
var admin = sessionStorage.getItem('admin_id');
var adminname1 = sessionStorage.getItem('admin_name');
var type1 = sessionStorage.getItem('cust_type');
 // console.log(type2);
console.log('User Logged In as' +type1);
console.log('Value of sessionStorage' +cust);

if(cust!=null){
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
  $rootScope.custname=custname1;
}

else if(driver!=null){
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
  $rootScope.custname=drivername1;
}

else if(admin!=null){
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
  $rootScope.custname=adminname1;
}

else {
  $rootScope.admin=true;
  $rootScope.tariff=true;
  $rootScope.login=false;
  $rootScope.sign=false;
  $rootScope.cabdriverdetail=true;
  $rootScope.booking=true;
  $rootScope.dribooking=true;
  // $rootScope.unauth=true;
  $rootScope.logout=true;
  $rootScope.changepassword=true;
  $rootScope.user=true;

}

if($sessionStorage.tokenDetails){
  $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;


if($rootScope.a!=undefined)
{
  $rootScope.b = $rootScope.a
  }
}

$rootScope.$on('$locationChangeStart', function(event, next, current){
  var PublicPages = ['/', '/login', '/register'];
  var AdminPages = ['/', '/login', '/register', '/tariff', '/cabdriverdetail', '/changepassword', '/booking', '/dribooking', '/logout'];
  var CustomerPages = ['/', '/login', '/register', '/changepassword', '/booking', '/logout']; // my rides need to add.
  var DriverPages = ['/', '/login', '/changepassword', '/dribooking', '/logout' ];

  var authUser = $cookies.getObject('userCookie');
  if(authUser != undefined){
    var loggedInUser = authUser.currentUser.userInfo;
  }

  var restrictedPage = PublicPages.indexOf($location.path())=== -1;
  var Admin = AdminPages.indexOf($location.path()) === -1;
  var Driver = DriverPages.indexOf($location.path()) === -1;
  var Customer = CustomerPages.indexOf($location.path()) === -1;
  var type2 = sessionStorage.getItem('cust_type');
  console.log("log in as" +type2);
  if(restrictedPage && !$sessionStorage.tokenDetails && $location.path() != ''){
      $location.path('/login');
  }
     console.log("data"+type2);

      if(Customer && $sessionStorage.tokenDetails && type2 == 'customer'){
           $location.path('/login');
      }

      else if(Admin && $sessionStorage.tokenDetails && type2 == 'admin'){
           $location.path('/login');
      }

      else if(Driver && $sessionStorage.tokenDetails && type2 == 'Driver'){
             $location.path('/login');
      }

});
});
