
function StorageEngine(storage) {
    this.addToCart = function(product) {
        var key = "product." + product.id;
        var itemJson = storage.getItem(key);
      
        if (itemJson) {
            var item = JSON.parse(itemJson);
            item.quantity += 1;
             storage.setItem("product." + product.id, JSON.stringify(item));
        } else {
            var item = {
                id: product.id,
                name: product.name,
                quantity: 1
            }

             storage.setItem("product." + product.id, JSON.stringify(item));
        }       
    }

    this.removeFromCart = function(id) {
        console.log("to rmeove ", id);
        storage.removeItem("product." + id);
    }

    
    this.getProducts = function() {
        var products = [];
        for(var key in storage) {
            if (key.indexOf("product.") > -1) {
                products.push(JSON.parse(storage.getItem(key)));
            }
        }
        return products;
    }

 

    this.emptyCart = function() {
         for(var key in storage) {
            if (key.indexOf("product.") > -1) {
                storage.removeItem(key);
            }
        }
    }
}


angular.module("cart.services", [])
.provider("cartService", function() {
    //default one
    this.engine = "SessionStorage";

    console.log("cartService default provider");

    this.$get = function() {
        var storageEngine = null;

        console.log("cartService $get");

        if (this.engine == "SessionStorage")
            storageEngine = new StorageEngine(window.sessionStorage);
        else if (this.engine == "LocalStorage") {
            storageEngine = new StorageEngine(window.localStorage);
        }

        
        return {
            addToCart: function(product) {
                storageEngine.addToCart(product);
            },
            removeFromCart : function(id) {
                storageEngine.removeFromCart(id);
            },
            getProducts : function() {
                return storageEngine.getProducts();
            },

            emptyCart : function() {
                storageEngine.emptyCart();
            }
        }
    }
})
