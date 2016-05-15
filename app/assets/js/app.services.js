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
                        },{
                            "id": "uid07",
                            "date": "Sun May 15 2016 11:07:01 GMT+0530 (IST)",
                            "location": "LOC2"
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
                data[id] = [];
                for(var user in usage[id].users){
                    var currentUser = usage[id].users[user];
                    data[id][currentUser.location] = (data[id][currentUser.location] || 0) + 1;
                }
            }
            return {coupons: coupons, data: data};
        }
        function couponVsTime(merchantID) {
            var usage = getUsage(merchantID).couponUsage;
            var data = [];
            var coupons = [];
            for (var id in usage){
                coupons.push(id);
                data[id] = [];
                for(var user in usage[id].users){
                    var currentUser = usage[id].users[user];
                    var momentDate = moment(new Date(currentUser.date)).format('DD MMM, Y HH:mm');
                    data[id][momentDate] = (data[id][momentDate] || 0) + 1;
                }
                data[id].sort(function(a,b){
                    return new Date(b) - new Date(a);
                })
            }
            return {coupons: coupons, data: data};
        }
        return object;
    });