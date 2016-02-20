'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
    $scope.currencySymbol = '£';
    
    
}])

.filter('capitalise', function() {
    return function(input, numberOfChar) {
        console.log(input)
        console.log("nubmer of Characters:" + numberOfChar)
        
        //  variableEvaluatesToTrue ? uppercase logic : default case;
        
      return (!!input) ? input.charAt(numberOfChar).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})

.filter('currencyNumber', ['$filter',function($filter) {
    return function(input, numberOfChar, currencySymbol) {

        var currencyValue = $filter('currency')(input, currencySymbol,numberOfChar);


        var returnValue = currencyValue;
        return returnValue
    }
}]);