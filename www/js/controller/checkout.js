starter.controller('CheckoutCtrl', function($scope, $localStorage, $ionicPopup, $ionicHistory, WC, $state){

  $scope.newOrder = {};

  $scope.paymentMethods = [
      { method_id: "bacs", method_title: "Έμβασμα"},
      { method_id: "cod", method_title: "Αντικαταβολή"}];

  $scope.switchBillingToShipping = function(){
    console.log($scope.newOrder);
    $scope.newOrder.shipping = $scope.newOrder.billing;
  }


  $scope.placeOrder = function(newOrder){


    $scope.orderItems = [];

    if($localStorage.cart){
      $localStorage.cart.forEach(function(element, index){
        $scope.orderItems.push({product_id: element.id, quantity: element.count});

      });
      console.log($scope.orderItems);
    }
    else
    {
      console.log("Το καλάθι είναι άδειο! Επιστροφή!");
      return;
    }

    var paymentData = {};

    $scope.paymentMethods.forEach(function(element, index){
      if(element.method_title == newOrder.paymentMethod){
        paymentData = element;
      }
    });


    var data = {
        payment_details: {
          method_id: paymentData.method_id,
          method_title: paymentData.method_title,
          paid: true
        },

        billing_address: {
          first_name: newOrder.billing.first_name,
          last_name: newOrder.billing.last_name,
          address_1: newOrder.billing.address_1,
          address_2: newOrder.billing.address_2,
          city: newOrder.billing.city,
          state: newOrder.billing.state,
          postcode: newOrder.billing.postcode,
          country: newOrder.billing.country,
          email: $localStorage.userData.data.user.email,
          phone: newOrder.billing.phone
        },
        shipping_address: {
          first_name: newOrder.shipping.first_name,
          last_name: newOrder.shipping.last_name,
          address_1: newOrder.shipping.address_1,
          address_2: newOrder.shipping.address_2,
          city: newOrder.shipping.city,
          state: newOrder.shipping.state,
          postcode: newOrder.shipping.postcode,
          country: newOrder.shipping.country
        },
        customer_id: $localStorage.userData.data.user.id || '',
        line_items: $scope.orderItems,
        total_shipping: $localStorage.totalShipping
      };

    var orderData = {};

    orderData.order = data;

    var Woocommerce = WC.WC();

    Woocommerce.post('orders', orderData, function(err, data, res){
      if(err)
        console.log(err);

      console.log(JSON.parse(res));
      if(JSON.parse(res).order){
        $ionicPopup.show({
          title: 'Συγχαρητήρια!',
          template: '<center>Η παραγγελία σας καταχωρήθηκε επιτυχώς. Ο αριθμός παραγγελίας σας είναι ' + JSON.parse(res).order.order_number + '.</center>',
          buttons: [{
            text: 'OK',
            type: 'button-assertive',
            onTap: function(e){
              $localStorage.cart = undefined;

              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
              });
              $ionicHistory.clearHistory();
              $ionicHistory.clearCache();
              $state.go('app.home');
            }
          }]
        })
      }
    });

  }


})
