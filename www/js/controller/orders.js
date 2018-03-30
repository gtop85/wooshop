starter.controller('OrdersCtrl', function($rootScope, $scope, $stateParams,$localStorage, WC, $ionicModal, $ionicLoading) {

  $scope.show();
  $scope.getOrders = function(){
     var Woocommerce = WC.WC();

     Woocommerce.get('orders?filter[customer_id]=' + $localStorage.userData.data.user.id, function(err, data, res){
       if (err)
        console.log(err);

       console.log(JSON.parse(res));

      $scope.orders = JSON.parse(res).orders;
   $scope.hide();
   })
  }

  $scope.getOrders();
  $scope.humaneDate = humaneDate;

  $scope.getOrders();
  $scope.doRefresh = function(){

    $scope.getOrders();
    $scope.$broadcast('scroll.refreshComplete');

  }

  $scope.showOrderModal = function(order_id){
    $scope.selectedOrder = order_id;
      $scope.modal = {};

      $ionicModal.fromTemplateUrl('templates/orderModal.html', {
        scope: $scope,
        animation: 'slide-in-left-right'
      }).then(function(modal){
        $scope.modal = modal;
        $scope.modal.show();
      });
    }
   })

   .controller('UserAgreementCtrl' , function()
        {

     })
