angular.module("brand.services", [])

.service("brandService", function($http, $q, apiEndPoint){
    this.getBrands = function() {
        return $http.get(apiEndPoint + "/api/brands")
            .then(function(response){
                return response.data;
            }, function(errorResponse){
                return $q.reject("error in response ", errorResponse);
            })
    }


    this.getBrand = function(id) {
        return $http.get(apiEndPoint + "/api/brands/" + id)
            .then(function(response){
                return response.data;
            }, function(errorResponse){
                return $q.reject("error ", errorResponse);
            })
    }
})