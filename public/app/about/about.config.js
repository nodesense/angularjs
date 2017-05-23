angular.module("about.config", [])
.config(function($stateProvider){
    $stateProvider
    .state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'app/about/templates/about.html'
    })
})