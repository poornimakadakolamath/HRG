
var app = angular.module('myApp', []);
	app.controller('myCtrl', function($scope, $http,$interval) {
		
		$scope.Listdata=function(){
			$http.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
		  .then(function(response) {
				$scope.getDataList = response.data;
		  })
		  //alert(2412);
		}
		
			/* Get data From api */
		$http.get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
		  .then(function(response) {
				$scope.getDataList = response.data;
				$scope.getChartDataForHorizontal=[];
				$scope.getChartDataForVertical=[];
				angular.forEach($scope.getDataList, function(value, key){
					$scope.getChartDataForHorizontal.push(value.name)
				});
				angular.forEach($scope.getDataList, function(value, key){
					$scope.getChartDataForVertical.push(value.price_usd)
				});
			
			/*BarChart for Currencies*/
			var a = document.getElementById("barchart");
			var myChart = new Chart(a, {
				type: 'bar',
				data: {
				labels:$scope.getChartDataForHorizontal,
				datasets: [{
					label: 'Currency Rate',
					data:  $scope.getChartDataForVertical,
					backgroundColor: "rgb(9,186,159)",
					borderColor: "rgb(79, 180, 198)",
					borderWidth: 2,
					hoverBackgroundColor: "rgba(66,244,229,0.4)",
					hoverBorderColor: "rgb(79, 180, 198)",
					borderWidth: 1
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
		});
	 })
	   $interval($scope.Listdata, 300000);
});
