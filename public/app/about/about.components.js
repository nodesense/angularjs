angular.module("about.components", [])

.component("contacts", {
    templateUrl: 'app/about/templates/contacts.html',
    controller: function() {
        this.address2 = {
            street: 'BG Road',
            city: 'Bangalore',
            state: 'Karnataka'
        }

        this.onContact = function(address) {
            console.log("contact now", address);
        }
    }
})

.component("contactAddress", {
    templateUrl: 'app/about/templates/contact-address.html',
    bindings: {
        address: '=',
        onContact: '&'
    },

    controller: function() {
        var self = this;
        
        this.buttonClicked = function() {
            this.onContact({address: self.address});
        }
    }
})