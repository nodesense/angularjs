angular.module('app.directives', [])

.directive("likes", function() {
    return {
        //replace the directive tag with template
        //DOM shall not have likes in the tree
        replace: true,
        //to shift content defined inside directive
        transclude: true,

        //scope: false, //share the parent scope/by default

        //new child scope derived from parent
       //scope: true, // $scope.$new()


       //Isolated Scope $scope.$new(true)
       //No parent getter/lookup
       scope: {
            //data binding
            "count": "=",
            "title": "@", //for hardcoded string
            //"count": "=count2" //alias name

            "likesClick": "&" //for function
       },

        restrict: 'E',
      //  template: '<h2>Likes</h2>'

        //templateUrl: "/app/templates/likes.html",

        templateUrl: function(elem, attrs) {
            if (attrs.template) {
                return "./app/templates/" + attrs.template;
            }

            return "./app/templates/likes.html";
        },

        controller: function( $scope) {
             
             $scope.increment = function() {
                  $scope.count++;
                 //$scope.count = $scope.count + 1;

                 if ($scope.likesClick)
                     $scope.likesClick();
             }

            console.log("likes controller");
        },

        //Link for accessing dynamic dom
        /*
        link: function(scope, elem, attrs) {

            console.log("id is ", attrs.id);

            elem.bind("mouseenter", function(){
                console.log("mouse enter")
                elem.addClass("highlight");
            })

            elem.bind("mouseleave", function(){
                 elem.removeClass("highlight");
            })

            
        },*/

        compile: function(elem, attrs) {
            var newElement = angular.element("<p>Link: {{count}}</p>");
            elem.append(newElement);

            //compile must return link function
            return function(scope, elem, attrs) {

            console.log("id is ", attrs.id);

            var decrementButton = angular.element(elem[0].querySelector('.decrement'));

            decrementButton.bind("click", function(){
                scope.count--;
                console.log("new value", scope.count);

                //calls $digest on current scope
                //scope.$digest();

                //Calls $rootScope.$digest()
                scope.$apply(function(){
                    
                }); 

            })


            elem.bind("mouseenter", function(){
                console.log("mouse enter")
                elem.addClass("highlight");
            })

            elem.bind("mouseleave", function(){
                 elem.removeClass("highlight");
            })

            
        }

            
        }
    }
})

.directive('likesInput', function() {
    return {
        restrict: 'AE',

        //= stands for two/double way data-binding
        scope: {
            value: '=ngModel'
        },

        require: 'ngModel',
       
        templateUrl: '/app/templates/likes-input.html',

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