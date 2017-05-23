"use strict";
angular.module("auth.config", [])
.config(function($stateProvider){
    $stateProvider
    .state("login", {
        url: "/auth/login",
        templateUrl : "app/auth/templates/login.html",
        controller : "LoginController"
    })
})

.config(function($httpProvider){
    //for example purpose only, ApplicationID shall be send as header for every request
    $httpProvider.defaults.headers.common.ApplicationID = '12345';

    //Injecting authService here introduce circular dependencies
    $httpProvider.interceptors.push(["$injector", function($injector){
        return {
            "request": function(config) {
                //send auth token
                var authService = $injector.get("authService");

                if (authService.isAuthenticated() && authService.getToken()) {
                     config.headers["Authorization"] =  "Bearer " + authService.getToken();
                }
                return config;
            }
        }
    }])
})
