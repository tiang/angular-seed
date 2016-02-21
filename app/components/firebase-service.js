angular.module('myApp')
.factory('FirebaseService', function() {
    var serviceTitle;
    var getTitleInServiceMethod = function() {
        console.log(this.firebaseURL);
            var ref = new Firebase(this.firebaseURL);
            
            ref.on("value", function(data) {
                if (data == null)
                    return;
                name = data.val().ChatApp.Title;
                console.log(name);
            })  
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
.directive('chatMessage', function() {
    return {
        templateUrl: 'partials/chatMessage.html',
        restrict: 'AC',
        controller: function() {
         
        },
        scope: {
            text: "=chatText"
        },
        link: function(scope, element, attrs)  {
            console.log(scope.text);
            console.log(scope.chatText);

        }
  };
})

.directive('chatDirective', function() {
    return {
        templateUrl: 'partials/chatDirective.html',
        restrict: 'E',
        controller: 'ChatAppController',
        scope: {

        },
        link: function(scope, element, attrs)  {

        }
  };
})
.controller('ChatAppController', function($scope,$timeout,$firebaseObject,$firebaseArray,FirebaseService) {
    FirebaseService.setTitle('My New Title')
    
    
    var ref = new Firebase(FirebaseService.firebaseURL);
    
    ref.child("ChatApp").child("Title").on("value", function(data) {
        if (data == null)
            return;
        $timeout(function() {
            $scope.title = data.val();
        })           
    })  
    
    $scope.messages = $firebaseArray(ref.child("ChatApp").child("Messages"))
            
    var twowayRef = $firebaseObject(ref.child("ChatApp").child("Messages"))        
    twowayRef.$bindTo($scope, "twoWayMessages");
    
    
    $scope.url = FirebaseService.firebaseURL;
    $scope.title = FirebaseService.getTitle()
    $scope.chat = {message: ""} 
    
    $scope.submit = function(msgToSave) {
        console.log('saving...' + msgToSave)
        $scope.chat["message"] = ""
        $scope.messages.$add({
            text: msgToSave
        });
    }
    
    $scope.$watch('messages', function(value) {
        console.log(value);
    }, true)
    
});
