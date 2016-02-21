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
    FirebaseService.setTitle('My New Title')

    $scope.url = FirebaseService.firebaseURL;
    $scope.title = FirebaseService.getTitle()
    $scope.chat = {message: ""} 
    $scope.messages = []
    
    $scope.submit = function(msgToSave) {
        console.log('saving...' + msgToSave)
        $scope.messages.push(msgToSave);
    }
});
