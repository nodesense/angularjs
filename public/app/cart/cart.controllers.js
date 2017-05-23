angular.module("cart.controllers", [])

.controller("CartController", function($scope, cartService){
   

    $scope.refreshCart = function() {
         $scope.products = cartService.getProducts();
    }

    $scope.removeFromCart = function(id) {
        cartService.removeFromCart(id);
        $scope.refreshCart();
    }

    $scope.emptyCart = function() {
        cartService.emptyCart();
        $scope.refreshCart();
    }

    $scope.refreshCart();
})