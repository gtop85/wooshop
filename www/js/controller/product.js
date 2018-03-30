starter.controller('ProductCtrl', function($scope, WC, $stateParams, $ionicSlideBoxDelegate,
  $localStorage, $rootScope, $ionicLoading){
   $scope.show();
   var Woocommerce = WC.WC();
   Woocommerce.get('products/' + $stateParams.productID, function(err, data, res){
     if(err)
       console.log(err);

     $scope.product = JSON.parse(res).product;
     $scope.images = JSON.parse(res).product.images;
     console.log($scope.product);
     $scope.$apply();

     $ionicSlideBoxDelegate.update();
     $ionicSlideBoxDelegate.loop(true);
     $scope.hide();

   })
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
