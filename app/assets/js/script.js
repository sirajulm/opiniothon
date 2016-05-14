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

angular.module('opinioApp')
    .factory('crmFactory', function () {
        var url = 'http://172.31.99.174:8081'
        var object = {
            postCoupon: postCoupon,
            getUsage: getUsage,
            couponVsUser: couponVsUser,
            couponVsLocation: couponVsLocation,
            couponVsTime: couponVsTime
        }

        var couponUsage = {
            "mid123456": {
                "merchantName": "Free Food",
                "coupons": [],
                "couponUsage": {
                    "BUR25": {
                        "users": [{
                            "id": "uid141",
                            "date": "Sun May 15 2016 07:45:11 GMT+0530 (IST)",
                            "location": "LOC1"
                        }, {
                            "id": "uid111",
                            "date": "Sun May 15 2016 10:41:19 GMT+0530 (IST)",
                            "location": "LOC1"
                        }, {
                            "id": "uid112",
                            "date": "Sun May 15 2016 05:09:48 GMT+0530 (IST)",
                            "location": "LOC2"
                        }, {
                            "id": "uid113",
                            "date": "Sun May 15 2016 05:49:59 GMT+0530 (IST)",
                            "location": "LOC1"
                        }, {
                            "id": "uid114",
                            "date": "Sun May 15 2016 05:05:25 GMT+0530 (IST)",
                            "location": "LOC3"
                        }, {
                            "id": "uid144",
                            "date": "Sun May 15 2016 05:49:59 GMT+0530 (IST)",
                            "location": "LOC3"
                        }]
                    },
                    "BEV18": {
                        "users": [{
                            "id": "uid101",
                            "date": "Sun May 15 2016 11:30:50 GMT+0530 (IST)",
                            "location": "LOC2"
                        }, {
                            "id": "uid10",
                            "date": "Sun May 15 2016 09:17:48 GMT+0530 (IST)",
                            "location": "LOC2"
                        }, {
                            "id": "uid111",
                            "date": "Sun May 15 2016 09:17:48 GMT+0530 (IST)",
                            "location": "LOC1"
                        }, {
                            "id": "uid217",
                            "date": "Sun May 15 2016 06:00:58 GMT+0530 (IST)",
                            "location": "LOC2"
                        }, {
                            "id": "uid10",
                            "date": "Sun May 15 2016 09:17:48 GMT+0530 (IST)",
                            "location": "LOC2"
                        }, {
                            "id": "uid101",
                            "date": "Sun May 15 2016 07:45:11 GMT+0530 (IST)",
                            "location": "LOC3"
                        }, {
                            "id": "uid237",
                            "date": "Sun May 15 2016 11:04:31 GMT+0530 (IST)",
                            "location": "LOC1"
                        }]
                    },
                    "PIZ30": {
                        "users": [{
                            "id": "uid03",
                            "date": "Sun May 15 2016 11:02:09 GMT+0530 (IST)",
                            "location": "LOC3"
                        }, {
                            "id": "uid110",
                            "date": "Sun May 15 2016 11:38:59 GMT+0530 (IST)",
                            "location": "LOC3"
                        }, {
                            "id": "uid61",
                            "date": "Sun May 15 2016 10:47:54 GMT+0530 (IST)",
                            "location": "LOC1"
                        }, {
                            "id": "uid247",
                            "date": "Sun May 15 2016 10:47:54 GMT+0530 (IST)",
                            "location": "LOC2"
                        }, {
                            "id": "uid15",
                            "date": "Sun May 15 2016 11:17:37 GMT+0530 (IST)",
                            "location": "LOC2"
                        }, {
                            "id": "uid11",
                            "date": "Sun May 15 2016 09:32:53 GMT+0530 (IST)",
                            "location": "LOC1"
                        }, {
                            "id": "uid207",
                            "date": "Sun May 15 2016 11:07:04 GMT+0530 (IST)",
                            "location": "LOC1"
                        }, {
                            "id": "uid100",
                            "date": "Sun May 15 2016 11:17:37 GMT+0530 (IST)",
                            "location": "LOC2"
                        }, {
                            "id": "uid1",
                            "date": "Sun May 15 2016 10:47:54 GMT+0530 (IST)",
                            "location": "LOC3"
                        }, {
                            "id": "uid27",
                            "date": "Sun May 15 2016 11:11:51 GMT+0530 (IST)",
                            "location": "LOC1"
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
        function couponVsTime(merchantID) {
            var usage = getUsage(merchantID).couponUsage;
            var data = []
            var coupons = [];
            for (var id in usage){
                coupons.push(id);
                data[id] = {};
                for(var user in usage[id].users){
                    var currentUser = usage[id].users[user];
                    var momentDate = moment(new Date(currentUser.date)).format('DD MMM, Y HH:mm');
                    console.log(momentDate)
                    data[id][momentDate] = (data[id][momentDate] || 0) + 1;
                }
            }
            return {coupons: coupons, data: data};
        }
        return object;
    })
    .controller('dataController', function ($scope, crmFactory) {
    $scope.formData = {};
    $scope.submitForm = function () {
        crmFactory.postCoupon($scope.formData).then(function (response) {
            $scope.formData = {};
        });
    }
}).controller('analyticsController', function ($scope, crmFactory) {
    $scope.barData = crmFactory.couponVsUser("mid123456");
    $scope.locData = crmFactory.couponVsLocation("mid123456");
    $scope.timeData = crmFactory.couponVsTime("mid123456");
    console.log($scope.timeData);
    $scope.pieCoupons = Object.keys($scope.locData.data)[0];
    $scope.lineCoupons = Object.keys($scope.timeData.data)[0];
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
    };

    $scope.drawPie = function (){
        var pieCtx = document.getElementById("myPieChart");
        $scope.pieDataset = {
            labels: Object.keys($scope.locData.data[$scope.pieCoupons]),
            datasets: [
                {
                    data: Object.keys($scope.locData.data[$scope.pieCoupons]).map(function (value) {
                        return $scope.locData.data[$scope.pieCoupons][value];
                    }),
                    backgroundColor: Object.keys($scope.locData.coupons).map(function(val){
                        return $scope.getRandomColor()
                    })
                }]
        };
        $scope.myPieChart = new Chart(pieCtx,{
            type: 'doughnut',
            data: $scope.pieDataset
        });
    };

    $scope.drawLine = function (){
        var lineCtx = document.getElementById("myLineChart");
        $scope.lineDataset = {
            labels: Object.keys($scope.timeData.data[$scope.lineCoupons]),
            datasets: [
                {
                    data: Object.keys($scope.timeData.data[$scope.lineCoupons]).map(function (value) {
                        return $scope.timeData.data[$scope.lineCoupons][value];
                    }),
                    backgroundColor: Object.keys($scope.timeData.coupons).map(function(val){
                        return $scope.getRandomColor()
                    })
                }]
        };
        $scope.myLineChart = new Chart(lineCtx,{
            type: 'line',
            data: $scope.lineDataset
        });
    };

    $scope.updatePie = function () {
        $scope.myPieChart.destroy()
        $scope.drawPie();
    };

    $scope.updateLine = function () {
        $scope.myLineChart.destroy()
        $scope.drawLine();
    };
    
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
    $scope.drawLine();
});
