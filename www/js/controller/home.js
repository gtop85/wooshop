starter.controller('HomeCtrl', function($scope, WC,$stateParams, $localStorage, $rootScope, $ionicLoading){
  $scope.show();
  $scope.getProducts = function(){
   var Woocommerce = WC.WC();

   Woocommerce.get('products', function(err, data, res){
     if (err)
      console.log(err);

     console.log(JSON.parse(res));

     JSON.parse(res).products.forEach(function(element, index){
       element.count = 0;
     })

     $scope.offset = 0;

     $scope.products = JSON.parse(res).products;
     $scope.offset = $scope.offset+10;
     $scope.canLoadMore = true;
     $scope.hide();

   })
  }

  $scope.getProducts();

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
