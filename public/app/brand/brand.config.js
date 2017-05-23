angular.module("brand.config", [])

.config(function($stateProvider){
    $stateProvider
    .state("brands", {
        abstract: true,
        template: '<brand></brand>'
    })
    
    //works for only angular-ui-router 1.0.0beta
    /*.state("brands.list", {
        url: '/brands/list',
        component : 'brandList'
    })

    .state("brands.view", {
        url: '/brands/view/:id',
        component: 'brandView'
    })*/

    .state("brands.list", {
        url: '/brands/list',
        template: '<brand-list></brand-list>'
    })
    .state("brands.view", {
        url: '/brands/view/:id',
        template: '<brand-view></brand-view>'
    })
})