"use strict";
angular.module("auth.module", [
    "auth.config",
    "auth.services",
    "auth.controllers"
])

.run(function($rootScope, authService){
    $rootScope.hasRole = function(role) {
        return authService.hasRole(role);
    }
})


.run(function($rootScope, $state, authService){
    
    console.log("run for events");

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        console.log("$stateChangeStart");

        
        if (toState.name === "login") {
            return;
        }

        console.log(toState);

        if (!authService.isAuthenticated()) {
            console.log("not authenticated");
            event.preventDefault(); 
            $state.go("login");
        }
    })

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error){
        console.log("Eror while loading page");
        $state.go("error");
    })

    $rootScope.$on('$stateNotFound', 
        function(event, unfoundState, fromState, fromParams){ 
            console.log("Not found");
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options

            $state.go("notfound");
    })
})