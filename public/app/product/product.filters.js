angular.module("product.filters", [])
.filter("myCustomFilter", function(){
    return function(input) {
        return "Best Selling " + input;
    }
} )


.filter("byYear", function() {
    return function(products, year) {
        
        if (!products)
            return;
        
        if (!year)  {
            console.log("year is null");
            return products;
        }

        
        var results = [];
        angular.forEach(products, function(product){
            console.log(product.year);
            if (product.year == year) {
                results.push(product);
            }
        })

        return results;
    }
})