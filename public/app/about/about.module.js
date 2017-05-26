 angular.module("about.module", [
    "about.config",
    "about.controllers",
    "about.components"
])

.constant ("TITLE", "Angular APP")

//Step 1: Call config to configure your app

//No $injector, no $compile

//Inject constant, $provide
.config(function(TITLE, $provide) {
    console.log("about config ", TITLE);

    // $provide.value("description", 
    //                 "Angular Product app desc");

    //module.value()
})

//internally calls $provide.value
.value("description", 
                    "Angular Product app desc")


//Step 2: Angular creates $injector, $compile

//Step 3: call run method

.run(function(description){
    console.log("run about ", description);
})


//$injector

.run(function($injector, serviceA){
    console.log("from injector",
             $injector.get("description"));

    var rootScope = $injector.get("$rootScope");

    rootScope.aboutTitle = "From injector " + serviceA.getTitle();

})

.service ("serviceA", function(serviceB, serviceC){
    console.log("serviceA created")

    this.getName = function() {
        return "from Service A Name";
    }

    this.getTitle = function () {
        return serviceC.getTitle();
    }
 
    
})

.service ("serviceB", function(serviceC){
     console.log("serviceB created")
})
//circular dependencies

.service ("serviceC", function($injector){
     console.log("serviceC created")
       
    return {
            getTitle: function() {
            var serviceA = $injector.get("serviceA");
            return serviceA.getName();
            }
        }
     
})

.run (function(serviceA){
    console.log("injected");
})

.run(function(description, $rootScope){
    console.log("run about ", description);
})


.config(function() {
    console.log("about config 2");
})

//

.run( function($rootScope){
    $rootScope.rootTitle = "Root Title";

    //create a child scope
    //try to look properties in the parent
    var child1 = $rootScope.$new();

    //resolve $rootScope.rootTitle
    console.log(child1.rootTitle);

    child1.rootTitle = undefined;

    child1.fruit = {
        name: 'apple'
    }

    console.log("undefined access", child1.rootTitle);

    var child2 = $rootScope.$new();


    //Isolated Scope
    //look always inside scope, no parent lookup
    var isolatedChild = child1.$new(true);

    isolatedChild.iTitle = "Isolated Title";
    //crash
    //isolatedChild.fruit.name = "undefined error";
    
    console.log("isolated to parent ", isolatedChild.rootTitle);

     console.log("isolated title ", isolatedChild.iTitle);


     console.log("from isolated parent", isolatedChild.$parent)

})