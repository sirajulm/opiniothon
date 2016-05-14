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

}).controller('dataController', function ($scope, crmFactory) {
    $scope.formData = {};
    $scope.submitForm = function () {
        crmFactory.postCoupon($scope.formData).then(function (response) {
            $scope.formData = {};
        });
    }
}).controller('analyticsController', function ($scope, crmFactory) {

    $scope.locData = crmFactory.couponVsLocation("mid123456");
    $scope.pieCoupons = Object.keys($scope.locData.data)[0]
    $scope.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    $scope.drawBar = function () {
        var ctx = document.getElementById("myChart");
        $scope.barData = crmFactory.couponVsUser("mid123456");
        $scope.barDataset = {
            labels: $scope.barData.coupons,
            datasets: [
                {
                    data: $scope.barData.users,
                    backgroundColor: $scope.barData.users.map(function(val){
                        return $scope.getRandomColor()
                    })
                }]
        };
        $scope.myBarChart = new Chart(ctx,{
            type: 'bar',
            data: $scope.barDataset
        });
    }

    $scope.drawPie = function (){
        var pieCtx = document.getElementById("myPieChart");
        $scope.pieDataset = {
            labels: Object.keys($scope.locData.data[$scope.pieCoupons]),
            datasets: [
                {
                    data: Object.keys($scope.locData.data[$scope.pieCoupons]).map(function (value) {
                        return $scope.locData.data[$scope.pieCoupons][value];
                    }),
                    backgroundColor: Object.keys($scope.locData.data[$scope.pieCoupons]).map(function(val){
                        return $scope.getRandomColor()
                    })
                }]
        };
        $scope.myPieChart = new Chart(pieCtx,{
            type: 'doughnut',
            data: $scope.pieDataset
        });
    }

    $scope.updatePie = function () {
        $scope.drawPie();
    }
    $scope.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    $scope.drawBar();
    $scope.drawPie();
}).factory('crmFactory', function () {
    var url = 'http://172.31.99.174:8081'
    var object = {
        postCoupon: postCoupon,
        getUsage: getUsage,
        couponVsUser: couponVsUser,
        couponVsLocation: couponVsLocation
    }

    var couponUsage = {
        "mid123456": {
            "merchantName": "Free Food",
            "coupons": [],
            "couponUsage": {
                "cid123": {
                    "users": [{
                        "id": "uid111",
                        "date": "01/05/2016 10:30",
                        "location": "1"
                    }, {
                        "id": "uid112",
                        "date": "01/05/2016 11:43",
                        "location": "2"
                    }, {
                        "id": "uid113",
                        "date": "01/05/2016 12:00",
                        "location": "1"
                    }, {
                        "id": "uid114",
                        "date": "01/05/2016 10:30",
                        "location": "3"
                    }]
                },
                "cid125": {
                    "users": [{
                        "id": "uid101",
                        "date": "01/05/2016 10:30",
                        "location": "2"
                    }, {
                        "id": "uid10",
                        "date": "01/05/2016 11:43",
                        "location": "2"
                    }, {
                        "id": "uid111",
                        "date": "01/05/2016 12:00",
                        "location": "1"
                    }, {
                        "id": "uid217",
                        "date": "01/05/2016 10:30",
                        "location": "2"
                    }, {
                        "id": "uid10",
                        "date": "01/05/2016 11:46",
                        "location": "2"
                    }, {
                        "id": "uid101",
                        "date": "01/05/2016 12:15",
                        "location": "3"
                    }, {
                        "id": "uid237",
                        "date": "01/05/2016 11:30",
                        "location": "1"
                    }]
                }
            }
        }
    }

    function postCoupon(data) {
        var endpoint = '/addcoupon';

        return fetch(url+endpoint,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.json();
        }).then(function (response){
            console.log(response)
        });
    }
    function getUsage(merchantID) {
        return couponUsage[merchantID]
    }
    function couponVsUser(merchantID) {
        var usage = getUsage(merchantID).couponUsage;
        var data = {coupons:[],users: []}
        for(var id in usage){
            data.coupons.push(id)
            data.users.push(usage[id].users.length)
        }
        return data;
    }

    function couponVsLocation(merchantID) {
        var usage = getUsage(merchantID).couponUsage;
        var data = []
        var coupons = [];
        for (var id in usage){
            coupons.push(id);
            data[id] = {};
            for(var user in usage[id].users){
                var currentUser = usage[id].users[user];
                data[id][currentUser.location] = (data[id][currentUser.location] || 0) + 1;
            }
        }
        return {coupons: coupons, data: data};
    }
    return object;
})
