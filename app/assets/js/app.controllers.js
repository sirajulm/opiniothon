
angular.module('opinioApp')
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
            data: $scope.barDataset,
            scales:{
                xAxes:[{
                    ticks:{
                        beginAtZero: true
                    }
                }]
            }

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
                    }),
                    fill: false,
                    borderColor:"#4BC0C0"
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