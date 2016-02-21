'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.router', 'firebase'])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state2");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1/:isLoggedIn",
      templateUrl: "partials/state1.html",
      controller:"state1Controller",
      resolve:  {
            myObject: function($q, $state, $stateParams, $timeout) {
                var q = $q.defer();
                console.log('calling myObject resolve')
                $timeout( function() {
                    console.log('timer executed');
                    var user = {name: "tiang", loggedin: $stateParams.isLoggedIn === "true"}
  
                    if (user.loggedin)
                        q.resolve(user)
                    else
                        $state.go('state2')
                }, 10);
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
      url: "/state2/:id",
      templateUrl: "partials/state2.html",
      controller: function($state) {
          console.log('entering state 2')
          console.log($state);
          console.log('id: ' + $state.params.id);
      }
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    })
    .state('chat', {
      url: "/chat",
      templateUrl: "partials/chat.html",
      controller: 'ChatAppController'
    });
})
.controller('state1Controller', function($state, $scope, myObject, myInstantUser) {
    console.log('opening state1 controller');
    console.log(myObject.name)
    console.log(myInstantUser);
    $scope.user = myObject
    
    $scope.goToState2 = function() {
        $state.go("state2", {id: 8})
    }
})
;