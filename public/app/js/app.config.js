angular.module("app.config", [])
.value("apiEndPoint", "http://localhost:7070")  
.value("settings", {})

.config(function(cartServiceProvider){
    console.log("default engine is ", cartServiceProvider.engine);
    //cartServiceProvider.engine = "SessionStorage";
     cartServiceProvider.engine = "LocalStorage";
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    /*$stateProvider
    
    .state("pagenotfound", {
        url: '/pagenotfound',
        template: '<h2>Page you are looking for is not found here </h2>'
    })
    */
   // $urlRouterProvider.otherwise("/home");

   $locationProvider.hashPrefix('');
   
   //$locationProvider.html5Mode(true);
   
})
.run(function(settings){
    settings.MAX_CART_SIZE = 100;
})