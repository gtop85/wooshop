starter.controller('BarcodeCtrl', function($scope, WC, $rootScope, $cordovaBarcodeScanner, $ionicPlatform, $ionicLoading) {
  $scope.filteredProduct = {};
  $scope.scanBarcode = function() {
      $scope.barcodeCode = null;

      document.addEventListener('deviceready', function() {
          $cordovaBarcodeScanner.scan().then(function(imageData){
              $scope.barcodeCode = imageData.text;
              $scope.getBarcode();
          }, function(error) {
              console.log("An error happened -> " + error);
          });
      })
  };

  $scope.getBarcode = function() {
      var Woocommerce = WC.WC();

      $ionicLoading.show({
          template: "Αναζήτηση"
      });

      Woocommerce.get('products?filter[limit]=140', function(err, data, res) {
          if (err){
              console.log(err);
          }

          var productsArray = JSON.parse(res).products;

          console.log(productsArray);

          function barcodeFilter(product) {
              return product.sku == $scope.barcodeCode;
          }

          var filteredArray = productsArray.filter(barcodeFilter);
          angular.extend($scope.filteredProduct, filteredArray[0]);
          $scope.$apply();

          $ionicLoading.hide();
      });
  };
})
