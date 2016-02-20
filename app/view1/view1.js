'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {

}])

.controller('View1Ctrl', ['$scope', '$sce', '$rootScope', function($scope, $sce, $rootScope) {

    $scope.person = {index: 0, age: 20, name: "Tiang", lastname: "Cheng"}
    var personB = {index: 1, age:18, name: "Heng Teng", lastname: "Chang"}
    var personC = {index: 2, age:16, name: "Heng Yew", lastname: "Chong", profilePhoto: "http://myimage.com/image.jpb"}
    $scope.people = [$scope.person, personB, personC]
    
    
    
    $rootScope.TestVariable = "Testing 123"
    var personCodeObserver;

     $scope.turnOnWatch = function() {
         console.log('turning on watch')
         
        personCodeObserver = $scope.$watch('person', function(newValue, oldValue) {
            console.log('New value of age is: ');
            console.log(newValue);
            console.log('New value of age is: ' );
                    console.log(oldValue);
            console.log($scope.person);
        },true)
     }

     
     $scope.turnOffWatch = function() {
        console.log('watch is not on. Nothing to turn off')
        if (personCodeObserver != null)
        {
            console.log('turning off watch')
            personCodeObserver()
        }
     }
 
 }]);
 
 
    // $scope.myHtml = "<h1>This is a header</h1>";
    // $scope.mySanitisedHTML = $sce.trustAsHtml($scope.myHtml);




// $watch = function() {
//     //$digest is an array of javascript variables to listen to
//     $digest.push('person')
//     //$digest['person'] = controller's person object
//     return function() { 
//         $digest.pop('person')
//     }
// }