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
            url: '/interests',
            templateUrl: 'partials/form-coupon.html'
        })
        .state('data.complete', {
            url: '/payment',
            templateUrl: 'partials/form-complete.html'
        });

    $urlRouterProvider.otherwise('/analytics');
});

angular.module('opinioApp').controller('mainController', function($scope) {
    $scope.message = 'Everyone come and see how good I look!';
    console.log($scope.message)
}).controller('dataController', function ($scope) {
    $scope.formData = {};
    $scope.processForm = function() {
        console.log('awesome!');
    };
}).controller('analyticsController', function ($scope) {
    $scope.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    var ctx = document.getElementById("myChart");
    var xlabels = ["Red", "green", "blue"];
    var data = [300, 50, 100];
    var dataset = {
        labels: xlabels,
        datasets: [
            {
                data: data,
                backgroundColor: data.map(function(val){
                    return $scope.getRandomColor()
                })
            }]
    };
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: dataset
    });
    /*
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabels,
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });*/
    $scope.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})
