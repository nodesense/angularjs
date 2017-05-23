angular.module("product.services", [])
.factory("Product", function($resource, apiEndPoint){
    console.log("Product factory called");

    return $resource(apiEndPoint + "/api/products/:id", null,
        {
            update: {method: 'PUT'}
        }
    )
})
