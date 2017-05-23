angular.module("about.controllers", [])
.controller("AboutController", function($scope){
    $scope.title = "About Page ";
    $scope.description = "Product App Company";
    
    $scope.team = ['Venkat', 'Krish', 'Ravi'];

    $scope.$on("pageTitleChanged", function($event, title){
        console.log("at AboutController:pageTitleChanged", title);
    })
  
    $scope.$emit("pageTitleChanged", "About");

})
 