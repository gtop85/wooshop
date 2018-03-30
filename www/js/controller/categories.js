starter.controller('CategoriesCtrl', function($scope, WC){

  var Woocommerce = WC.WC();
  Woocommerce.get('products/categories', function(err, data, res){
    if(err){
      console.log(err);
    }

    $scope.categories = (JSON.parse(res)).product_categories;

  })

})
