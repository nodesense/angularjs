angular.module("product.directives", [])
 /*
    
    <input name="year" ng-model="product.year" year-validator="" 
    class="ng-valid ng-valid-valid-year ng-not-empty ng-dirty ng-valid-parse ng-touched">
*/
/*
<input name="year" ng-model="product.year" year-validator="" class="ng-pristine ng-untouched ng-invalid ng-invalid-valid-year ng-not-empty">
*/
 
.directive("productWidget", function(){
    return {
        restrict: 'EA',
        templateUrl: 'app/product/templates/product-widget.html',
        scope: {
            product: '=',
            addToCart: '&'
        },

        controller: function($scope) {
             
        },

        link: function(scope, elem, attr) {
             elem.bind("mouseenter", function(){
                 console.log("mouse enter");

                var promotionElement = angular.element(elem[0].querySelector('.promotion'));

                 promotionElement.addClass("label");
                 promotionElement.addClass("success");
                 
                var offer = Math.ceil(100 * Math.random());  
                promotionElement.html("<span> Offer: " + offer + " %"  + "</span>");
             })

             elem.bind("mouseleave", function(){
                 var promotionElement = angular.element(elem[0].querySelector('.promotion'));
                 promotionElement.removeClass("label");
                 promotionElement.removeClass("success");
                 promotionElement.html("<span></span>");
                  console.log("mouse leave");

             })
        }
    }
})


.directive("yearValidator", function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            console.log("yearValidator called");

            ngModel.$validators.validYear = function(modelValue, viewValue) {
                console.log("valid year", modelValue, viewValue);

                var value = modelValue || viewValue;

                try {
                    value = parseInt(value);
                    if (value >= 2010 && value <= 2016)
                        return true;
                }
                catch(ex) {

                }

                return false;
            }
        }
    }

})




















.directive("productInfo", function(){
    console.log("product-info");

    return {
        restrict: 'AE',
        scope: true,
        templateUrl : '/app/product/templates/product-info.html',

        link: function(scope, element, attrs) {
             var promotionElement = angular.element(element[0].querySelector('.promotion'));

             element.bind("mouseenter", function(){
                 promotionElement.addClass("label");
                 promotionElement.addClass("success");

                 
                var offer = Math.ceil(100 * Math.random());  
                promotionElement.html("<span> Offer: " + offer + " %"  + "</span>");
             })

             element.bind("mouseleave", function(){
                 promotionElement.removeClass("label");
                 promotionElement.removeClass("success");
                 promotionElement.html("<span></span>");
             })
        }
    }
})

.directive("validateYear", function() {
    return {
        restrict: "A",
        require: 'ngModel',

        link: function(scope, elem, attrs, ngModel) {
            console.log("validate Year");

            ngModel.$validators.validYear = function(modelValue, viewValue) {
                console.log("model ", modelValue, "viewValue", viewValue);

                var value = modelValue || viewValue;

                if (!value) 
                    return false;
                
                try {
                    var intValue = parseInt(value);
                    if (intValue >= 2010 && intValue <= 2016)
                        return true;
                }
                catch(ex) {

                }

                return false;
            }

        }
    }
})

.directive("validateName", function($http, apiEndPoint, $q) {
    return {
        restrict: "A",
        require: "ngModel",

        link: function(scope, elem, attrs, ngModel) {
            ngModel.$asyncValidators.validName = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                console.log("Async validators");
                console.log("model ", modelValue, "viewValue", viewValue);
                

                return $http.get(apiEndPoint + "/api/products", {params: {name: value}})
                .then(function(response){
                    var products = response.data;
                    if (products.length > 0) {
                        console.log("products.length ", products.length);
                        return $q.reject('exists');
                    }
                    
                    return true;
                }, function(err){
                    return $q.reject("error");
                })
            }
        }
    }
})

.directive("weight", function() {
    return {
        restrict: "A",
        require: "ngModel",

        link: function(scope, elem, attrs, ngModel) {
            //convert the value to lower case before display
            ngModel.$parsers.push(function(value){
                value = value || '';
                value = value.toLowerCase();
                return value;
            });

            //if user enter kilogram, it convers to kg
            ngModel.$formatters.push(function(value){
                console.log("formatter for weight");
                value = value || '';
                console.log(value);
                value = value.toLowerCase();
                value = value.replace("kilogram", "kg");
                return value;
            });
        }
    }
})

