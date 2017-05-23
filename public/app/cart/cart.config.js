angular.module("cart.config", [])

.config(function($stateProvider){
    $stateProvider
    .state("cart", {
        url: '/cart',
        templateUrl: '/app/cart/templates/cart.html',
        controller: 'CartController'
    })
});