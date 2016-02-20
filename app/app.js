'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state2");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html",
      controller:"state1Controller",
      resolve:  {
            myObject: function($q, $timeout) {
                var q = $q.defer();
                console.log('calling myObject resolve')
                $timeout( function() {
                    console.log('timer executed');
                    var user = {name: "tiang", loggedin: true}
  
                    q.resolve(user)
                }, 2000);
                return q.promise;
            },
            myInstantUser: function(){
                console.log('calling myInstantUser resolve')
                return "Another user";
            }
        }
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
})
.controller('state1Controller', function($state, $scope, myObject, myInstantUser) {
    console.log('opening state1 controller');
    console.log(myObject.name)
    console.log(myInstantUser);
    $scope.user = myObject
})
;



// <a href="/hello">

// /#/****path*****

// resolve login 
// controller:
// view
// onEnter


// {
//     url: "/state1",
//     templateUrl: "partials/state1.html",
//     template: "<div>Hllo</div>"
//     controller: function() {},
//     controller: 'state1Controller'
// }