angular.module("brand.components", [])

.component('brand', {
  templateUrl: 'app/brand/templates/brand-layout.html',
  controller: function() {
      this.title = "Our Brands";
  }
})

.component('brandList', {
    templateUrl: 'app/brand/templates/brand-list.html',
    controller: function(brandService) {
        var self = this;

        brandService.getBrands()
        .then(function(brands){
            console.log("brands ", brands.length);
            self.brands = brands;
        }, function(error){
            console.log("could not fetch brands ", error);
        })
    }
})


.component('brandView', {
    templateUrl: 'app/brand/templates/brand-view.html',
    controller: function(brandService, $stateParams) {
        var self = this;
        if ($stateParams.id) {
            brandService.getBrand($stateParams.id)
                .then(function(brand){
                    console.log("brand ", brand);
                    self.brand = brand;
                }, function(error){
                    console.log("could not fetch brand ", error);
                })
        }
        
    }
})
