angular.module('myApp')
.factory('FirebaseService', function() {
    return {
        firebaseURL: "https://ngfeb.firebaseio.com"
    }
})
.controller('ChatAppController', function($scope) {
    $scope.title= "Hello Chat App"
});