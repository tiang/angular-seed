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
.controller('ChatAppController', function($scope,$timeout,$firebaseArray,FirebaseService) {
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
});
