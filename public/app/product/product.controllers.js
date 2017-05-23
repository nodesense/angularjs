angular.module("product.controllers", [])

.controller("ProductListController", function($scope, $http, Product, cartService) {

    $scope.$emit("setPageTitle", "Product List");

    Product.query(function(products, headersFn){
            $scope.products = products;
        })

    
    $scope.addToCart = function(product) {
        console.log("add to cart ", product.name);
        cartService.addToCart(product);
    }

})

.controller("ProductPaginateController", function($scope, $http, Product, cartService){
 
    var paginate = {
        start : 0,
        end: 10,
        limit : 10,
        total : -1
    }

    $scope.enableNext = true;
    $scope.enableBack = false;

    $scope.getProducts = function() {
        Product.query({_start: paginate.start, _end : paginate.end}, function(products, headersFn){
            $scope.products = products;
 
            paginate.total = parseInt(headersFn("X-Total-Count"));
        })
    }


    $scope.addToCart = function(product) {
        console.log("add to cart ", product.name);
        cartService.addToCart(product);
    }

  

    //FIXME: Chances for bugs in count, iteration, give for example only
    $scope.next = function() {
        console.log(paginate);

        if ((paginate.start + paginate.limit) < paginate.total) {
            paginate.start = paginate.start + paginate.limit;
            paginate.end = paginate.start + 10;
            $scope.getProducts();
             $scope.enableBack = true;
        } else {
            $scope.enableNext = false;
            $scope.enableBack = true;
        }
    }

    //FIXME: Chances for bugs in count, iteration, give for example only
    $scope.back = function() {
        console.log(paginate);

        if ((paginate.start - paginate.limit) >= 0) {
            paginate.start = paginate.start - paginate.limit;
            paginate.end = paginate.start + 10;
            $scope.getProducts();
             $scope.enableNext = true;
        } else {
            $scope.enableBack = false;
            $scope.enableNext = true;
        }
    }

      $scope.getProducts();

})
/*.controller("ProductViewController", function($scope, $state, $stateParams){
    //product details
    console.log("product id is ", $stateParams['id']);
})
*/

.controller("ProductViewController", ["$scope", "$state", "$stateParams", 
            "Product", 
           function($scope, $state, $stateParams, Product){
    //product details
    console.log("product id is ", $stateParams['id']);
    //GET /api/products/100 
    Product.get({id: $stateParams['id']}, function(product){
        $scope.product = product;
    })

    $scope.gotoList = function() {
        $state.go("product.list");
    }

    $scope.editProduct = function(id) {
        $state.go("product.edit", {"id": id});
    }


    $scope.deleteProduct = function(id) {
        Product.delete({'id': id}, function(){
              $state.go("product.list");
        })
    }


}])
//products/edit/1
.controller("ProductEditController", function($scope, Product, $stateParams, $state) {

    $scope.$emit("setPageTitle", "Product Edit");
    if ($stateParams.id) {
        Product.get({id: $stateParams.id}, function(product){
            $scope.product = product;
        })
    } else {
        $scope.product = new Product();
    }

     $scope.saveProduct = function() {
            console.log($scope.product);
            if ($scope.product.id) {
                 //PUT /api/products/id
                 $scope.product.$update({id: $scope.product.id});
            } {
                $scope.product.$save(); //POST /api/products -- create new one
            }
    }

    $scope.gotoListPage = function() {
        $state.go("product.list");
    }

    $scope.deleteProduct = function() {
        Product.delete({id: $scope.product.id}, function(){
                $state.go("product.list");
        }, function(err){

        })
    }

    $scope.$watch("product.year", function(newValue, oldValue){
        //console.log("product year modified ", oldValue, newValue)
    })

})














/*
.controller("ProductEditController", ["$scope", "$state", "$stateParams", 
            "Product", 
           function($scope, $state, $stateParams, Product){
     
    //GET /api/products/100 
    if ($stateParams['id']) {
        Product.get({id: $stateParams['id']}, function(product){
            $scope.product = product;
        })
    } else {
        $scope.product = new Product();
    }

    $scope.productNameChanged = function() {
        console.log("name changed ", $scope.product.name);
    }

    
    $scope.productWeightChanged = function() {
        console.log("weight changed ", $scope.product.weight);
    }

    $scope.saveProduct = function() {
        console.log("Save Product");
        console.log($scope.product);

        console.log("before save ", $scope.product.id);
        $scope.product.$save( function(productSaved){
            console.log("after save ", $scope.product.id);
            console.log("product saved successfully ", productSaved.year);
        })
    }
 
}])

.controller("ProductEditHttpController", 
    function($scope, $stateParams, $http, apiEndPoint){
        if ($stateParams.id) {
            $http.get(apiEndPoint + "/api/products/" + $stateParams.id)
            .then(function(response) {
                $scope.product = response.data;
            })
        } else {
            $scope.product = {};
        }

        $scope.saveProduct = function() {
            console.log("before ssave ", $scope.product.id);
            if ($scope.product.id) {
                 $http.put(apiEndPoint + '/api/products/' + $scope.product.id, $scope.product)
                .then(function(response) {
                    console.log("after save ", $scope.product.id);
                    console.log("from server response ", response.data.id);
                    $scope.product = response.data;
                })
            }
            else {
                $http.post(apiEndPoint + '/api/products', $scope.product)
                .then(function(response) {
                    console.log("after save ", $scope.product.id);
                    console.log("from server response ", response.data.id);
                    $scope.product = response.data;
                })
             }
        }

        
    $scope.productWeightChanged = function() {
        console.log("weight changed ", $scope.product.weight);
    }

    })*/