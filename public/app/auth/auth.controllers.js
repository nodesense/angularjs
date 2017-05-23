"use strict";
angular.module("auth.controllers", [])
.controller("LoginController", function($scope, $rootScope, apiEndPoint, $state, authService) {
    $scope.username = "";
    $scope.password = "";

    $scope.login = function() {
    
    authService.login($scope.username, $scope.password)
    .then(function(response) {
         $rootScope.$broadcast("LoggedIn", "User LoggedIn");
         $state.go("home");
    }, function(error){
        console.log("error");
         $scope.error = "invalid username/password";
    })
 
    }
})