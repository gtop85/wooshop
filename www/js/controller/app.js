starter.controller('AppCtrl', function($scope, WC, $localStorage, $rootScope, $ionicModal, $state, $ionicLoading){

  $scope.show = function() {
  $ionicLoading.show({
    template:  '<ion-spinner icon="circles" class="spinner-balanced"></ion-spinner>'
  }).then(function(){
     console.log("The loading indicator is now displayed");
  });
};
$scope.hide = function(){
  $ionicLoading.hide().then(function(){
     console.log("The loading indicator is now hidden");

  });
};

$scope.$on('$ionicView.enter', function(e) {
  console.log("userData", $localStorage.userData);
  if($localStorage.userData){
    $rootScope.userData = $localStorage.userData
  }
});

$scope.logout = function(){
  $localStorage.userData = undefined;
  $rootScope.userData = undefined;
}

$localStorage.cart = [];

if($localStorage.cart)
  $rootScope.cartCount = $localStorage.cart.length;
else
  $rootScope.cartCount = 0;

var Woocommerce = WC.WC();

Woocommerce.get('products/categories', function(err, data, res){
  console.log(res);

  $scope.categories = (JSON.parse(res)).product_categories;
  $scope.mainCategories = [];
  $scope.categories.forEach(function(element, index){
    if(element.parent == 0)
      $scope.mainCategories.push(element);
  })
})

$scope.showCartModal = function(){
  $scope.cartItems = $localStorage.cart;

  if(!$scope.cartItems || $scope.cartItems.length == 0){
    console.log("no items in the cart!");
    alert("Το καλάθι είναι άδειο!");
    return;
  }
  $scope.subcostSum = 0;
  $scope.weightSum = 0;
  $localStorage.totalShipping = '0';
  $scope.cartItems.forEach(function(element, index){
    $scope.subcostSum += Number(element.price);
    $scope.weightSum += Number(element.weight);
  });
 $scope.checkTotal = function(){
 if ($scope.weightSum < 20 & $scope.subcostSum > 25)
    { $scope.costSum = $scope.subcostSum;
      $localStorage.totalShipping = '0';}
      else {$scope.costSum = $scope.subcostSum + 5.5;
         $localStorage.totalShipping = '5.5';}

  $scope.cubcostSum = $scope.subcostSum.toFixed(2);
  $scope.costSum = $scope.costSum.toFixed(2);
  console.log('total shipping is:'+ $localStorage.totalShipping);
 }
 $scope.checkTotal();
 $scope.modal = {};

  $ionicModal.fromTemplateUrl('templates/cartModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
    $scope.modal.show();
  });

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
      $scope.checkTotal();
    }
  });

  if(!countIncreased){
    product.count = 1;
    $localStorage.cart.push(product);
  }

  $rootScope.cartCount = $localStorage.cart.length;

}

$scope.removeFromCart = function(product){
  var countIncreased = false;
  $localStorage.cart.forEach(function(item, index){
    if(item.id == product.id && item.count > 1){
      console.log(item.id + " == " + product.id);
      item.count -= 1;
      console.log("Count decreased by 1");

      countIncreased = true;
      $scope.subcostSum -= Number(item.price);
      $scope.weightSum -= Number(item.weight);
      $scope.checkTotal();
    }
  else $scope.deleteCart();
  });

  $rootScope.cartCount = $localStorage.cart.length;

}

  $scope.deleteCart = function(product){
  var countIncreased = false;
  $localStorage.cart.forEach(function(item, index){
    if(item.id == product.id && !countIncreased){
      console.log(item.id + " == " + product.id);
      item.count = 0;
      console.log("product deleted");
      countIncreased = true;

    }
  });

   if(!countIncreased){
    product.count = 1;
    $localStorage.cart.push(product);
  }
  $rootScope.cartCount = $localStorage.cart.length;

  }

$scope.handleCheckout = function(){
    console.log("Handle Checkout Called!");
    $scope.modal.hide();
    if($localStorage.userData)
      $state.go("app.checkout")
    else
      $state.go("app.login")
  }

})
