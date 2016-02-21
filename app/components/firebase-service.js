angular.module('myApp')
.factory('FirebaseService', function() {
    var serviceTitle;
    var getTitleInServiceMethod = function() {
                        if (this.serviceTitle == null)
                            return "No title set"    
                        else 
                            return this.serviceTitle;
                        };
                
    return {
        firebaseURL: "https://ngfeb.firebaseio.com",
        setTitle: function(controllerTitle) {
            this.serviceTitle = controllerTitle;
        },
        getTitle: getTitleInServiceMethod,
        getTitle2: this.serviceTitle
    }
})
.controller('ChatAppController', function($scope,FirebaseService) {
    $scope.title= "Hello Chat App"
    $scope.url = FirebaseService.firebaseURL;
    console.log(FirebaseService.getTitle());
    FirebaseService.setTitle('My New Title')
    console.log(FirebaseService.getTitle());
});


/****  App Route  ****/
// .state('chat', {
//     url: "/chat",
//     templateUrl: "partials/chat.html",
//     controller: 'ChatAppController'
// });


/****  HTML  ****/
// Hello World

// {{title}}
// <br>
// {{url}}