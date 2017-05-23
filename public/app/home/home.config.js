angular.module("home.config", [])
.config(function($stateProvider){
    $stateProvider
    .state("default", {
        url: '',
        controller: 'HomeController',
        templateUrl: 'app/home/templates/home.html'
    })
    
    .state("home", {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'app/home/templates/home.html'
    })
      
    .state("home-resolve", {
        url: '/home-resolve',
        templateUrl: '/app/home/templates/home.html',
        controller: 'HomeResolveController',

        resolve: {
          "products" : function(Product) {
                console.log("products");
                return  Product.query().$promise;
          },

          "brands" : function(brandService) {
                console.log("brands");
                return  brandService.getBrands();
          },

           "states" : function($http, apiEndPoint) {
                console.log("Staes");
                
                return  $http.get(apiEndPoint + "/api/states")
                        .then(function(response){
                            return response.data;
                        });
          }
        }
        
        
    })
})