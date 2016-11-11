'use strict';

var euphs = [
    "banging","doing it","bumping uglies","taking a trip to pound town", "knocking boots",
    "doing the no pants dance", "sliming the banana","filling the cream donut", "boning",
    "stuffing the taco","riding the skin bus into tuna town","spearing the bearded clam",
    "boinking","playing hide the canoli","parking the beef bus in tuna town","humping",
    "fornicating","shagging","fucking","putting sour cream in the burrito",
    "putting ranch dressing in the hidden valley"
    ]

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.getData = function(){
        var inpDay = $scope.inputDay;
        var inpMonth = $scope.inputMonth;
        var inpYear = $scope.inputYear;

        if (!isNumber(inpDay) || !isNumber(inpMonth) || !isNumber(inpYear)){
            return false;
        }
        var inputDate = inpYear + '-' + inpMonth + '-' + inpDay

        $http.get('https://api.tuchfarber.com/api/onthislay/' + inputDate)
        .then(
            function(response) {
                $scope.date = new Date(response.data.data.day).toDateString();

                var details = response.data.data.detail;
                if(details !== ''){
                    $scope.details = response.data.data.detail
                    
                    $scope.parents = "While your parent were busy " + euphs[Math.floor(Math.random() * euphs.length)] + ",";
                }else{
                    $scope.details = "Your parents' coitus was not inspired by any important event."
                }
            },
            function(response) {
                //Swallow that shit. 
            });
    };
}]);

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}