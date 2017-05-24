angular.module('app.directives', [])

.directive('likes', function() {
    return {
        restrict: 'AE',

        //= stands for two/double way data-binding
        scope: {
            value: '=ngModel'
        },

        require: 'ngModel',
       
        templateUrl: '/app/templates/likes.html',

        

         link: function(scope, iElement, iAttrs, ngModel ) {
             console.log("footer");

            //scope.value = 0;


            ngModel.$render = function() {
                console.log("$render called");
                iElement.find('span').text(ngModel.$viewValue);
            };

            ngModel.$validators.validLikes = function(modelValue, viewValue) {
                var value  = modelValue | viewValue;

                console.log("valid called ", value);

                if (value < 100)
                    return false;
                    
                return true;
            }

            scope.increment = function() {
                //scope.value++;

                 // call $parsers pipeline then update $modelValue
                ngModel.$setViewValue(ngModel.$viewValue + 1);
                
                // update the local view
                ngModel.$render();

            }
            scope.decrement = function() {
                 // call $parsers pipeline then update $modelValue
                ngModel.$setViewValue(ngModel.$viewValue - 1);
                
                // update the local view
                ngModel.$render();
            }


        }
                   
    };
});