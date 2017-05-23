angular.module("app.controllers", [])
.controller("NavigationController", function($scope, $rootScope, $state, authService){
     $scope.authenticated = authService.isAuthenticated();

     $scope.$on("LoggedIn", function(event){
         $scope.authenticated = true;
     })
     
     $scope.$on("LoggedOut", function(event){
         $scope.authenticated = false;
     })

     $scope.logout = function() {
         authService.logout();
         $rootScope.$broadcast("LoggedOut", "User Logged out");
         $state.go("login");
     }

     $scope.hasRole = function(name) {
         return authService.hasRole(name);
     }
})