starter.controller('CategoryCtrl', function(WC, $scope, $stateParams, $localStorage, $rootScope){
  $scope.show();
  console.log($stateParams.categoryID);

  var Woocommerce = WC.WC();

  Woocommerce.get('products?filter[category]='+$stateParams.categoryID, function(err, data, res){
     if(err)
      console.log(err);
    $scope.products =JSON.parse(res).products;
    $scope.$apply();
    $scope.products.forEach(function(element, index){
      element.count = 0;

   $scope.offset = 0;

   $scope.products = JSON.parse(res).products;
    $scope.hide();
   $scope.offset = $scope.offset+10;
   $scope.canLoadMore = true;
    }); console.log($scope.categories);

  $scope.loadMore = function(){

  var Woocommerce = WC.WC();

   Woocommerce.get('products?filter[category]=' + $stateParams.categoryID + '&filter[offset]='+$scope.offset, function(err, data, res){
      if(err)
        console.log(err);

        JSON.parse(res).products.forEach(function(element,index){
          element.count = 0;
          $scope.products.push(element);
     })

      $scope.$broadcast('scroll.infiniteScrollComplete');

      if(JSON.parse(res).products.length <10){
        $scope.canLoadMore = false;
        console.log("no more products");
        return;
      }
      else{
        $scope.offset = $scope.offset +10;
      }

   })

  }


 $scope.addToCart = function(product){
    var countIncreased = false;
    $localStorage.cart.forEach(function(item, index){
      if(item.id == product.id && !countIncreased){
        console.log(item.id + " == " + product.id);
        item.count += 1;
        console.log("Count increased by 1");
        countIncreased = true;
        $scope.subcostSum += Number(item.price);
        $scope.weightSum += Number(item.weight);
      }
    });

    if(!countIncreased){
      product.count = 1;
      $localStorage.cart.push(product);
    }

    $rootScope.cartCount = $localStorage.cart.length;


  }
  })
 })
