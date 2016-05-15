'use strict';
angular.module('opinioApp', ['ngAnimate', 'ui.router']);

angular.module('opinioApp').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('analytics',{
            url: '/analytics',
            templateUrl: 'partials/analytics.html',
            controller: 'analyticsController'
        })
        .state('data', {
            templateUrl: 'partials/form.html',
            controller: 'dataController'
        })
        .state('data.profile', {
            url: '/profile',
            templateUrl: 'partials/form-profile.html'
        })
        .state('data.coupon', {
            url: '/coupon',
            templateUrl: 'partials/form-coupon.html'
        })
        .state('data.complete', {
            url: '/complete',
            templateUrl: 'partials/form-complete.html'
        });

    $urlRouterProvider.otherwise('/analytics');
});
