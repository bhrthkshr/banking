angular.module("app", ['angularUtils.directives.dirPagination']).controller("main.control", function($scope, $http, $filter) {

  $scope.cities = ["BANGALORE", "CHENNAI", "MUMBAI", "PUNE", "DELHI"];
  $scope.select_city = $scope.cities[0];
  $scope.list = [10, 20, 30, 40, 50, 100];
  $scope.listsize = $scope.list[1];
  $scope.cpage = 1;
  $scope.idx = 0;
  $scope.loaded = false;
  $scope.blist = [];


  $scope.$watch('select_city', function(newval) {
    $scope.loaded = false;
    $scope.city = newval;
    $http({
      cache: true,
      method: 'GET',
      url: 'https://vast-shore-74260.herokuapp.com/banks?city=' + $scope.city
    }).then(function(response) {
      $scope.bankdata = response.data;
      $scope.loaded = true;
      for (var i = 0; i < $scope.bankdata.length; i++) {
        if ($scope.blist.indexOf($scope.bankdata[i].bank_name) == -1) {
            $scope.blist.push($scope.bankdata[i].bank_name);
        }
      }
    })
  });


  $scope.searching = false;
  $scope.$watch('query', function(val) {
    if (val) {
      $scope.searching = true;
      $scope.filtered = $filter('filter')($scope.bankdata, val);
    }
    if (val == "") {
      $scope.searching = false;
    }
  });

  $scope.add_fav = function(val, i) {
    if ($scope.filtered[i - 1].fav == true) {
      $scope.filtered[i - 1].fav = false;
      localStorage.removeItem(i);
    } else {
      localStorage.setItem(i, val);
      $scope.filtered[i - 1].fav = true;
    }
  }

});
