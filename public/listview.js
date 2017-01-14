angular.module('EventCMS')

.controller("ListCtrl", [
    "$scope", "$rootScope", "$state", "$log", "$stateParams", "$http",
    function($scope, $rootScope, $state, $log,  $stateParams, $http) {
    	$log.info("ListCtrl ran")

    	$scope.placement = {}

    	$scope.orderField = 'name'

    	$http.get('/data.json')
			.success(function(response){
				$scope.categories = $scope.buildCategoriesMap(response.categories)
				$scope.products = response.products
				_.forEach($scope.products, function(product) {
					product.categorySummary = $scope.categoriesSummary(product.categories)
					product.price = parseFloat(product.price.replace(".",""))
					product.moreThan10000 = parseFloat(product.price) > 10000
					product.lessThan3000 = parseFloat(product.price) < 3000
				});
			})

		$scope.buildCategoriesMap = function(categories){
			return _.reduce(categories , function(obj,param) {
				 obj[param.categori_id] = param.name
				 return obj;
				}, {});
		}

		$scope.updateFilter = function(value){
			if($scope.placement.lessThan3000 == false){
				$scope.placement.lessThan3000 = undefined
			} 
			if($scope.placement.moreThan10000 == false){
				$scope.placement.moreThan10000 = undefined
			} 
		}


		$scope.clearMoneyFilter = function(){
		}

		$scope.categoriesSummary = function(categories){
			var catSummary = ""
			_.forEach(categories, function(categorie) {
				if(catSummary != ""){
					 catSummary += ","
				}
			 catSummary += $scope.categories[categorie]
			});
			return catSummary
		}


		$scope.cart = []
		$scope.addToCart = function(product){
			$scope.cart.push(product)

		}

		$scope.removeFromCart = function(product){
			var index = $scope.cart.indexOf(product);
  			$scope.cart.splice(index, 1);     
		}

}])