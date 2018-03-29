angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, WC, $localStorage, $rootScope, $ionicModal, $state, $ionicLoading){

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

.controller('HomeCtrl', function($scope, WC,$stateParams, $localStorage, $rootScope, $ionicLoading){
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

.controller('BrowseCtrl' , function($scope, WC, $localStorage, $rootScope, $ionicLoading){
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
$scope.doRefresh = function(){
  $scope.getProducts();
  $scope.$broadcast('scroll.refreshComplete');

}

$scope.loadMore = function(){

  var Woocommerce = WC.WC();

    Woocommerce.get('products?filter[offset]='+$scope.offset, function(err, data, res){
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

.controller('CategoriesCtrl', function($scope, WC){

  var Woocommerce = WC.WC();
  Woocommerce.get('products/categories', function(err, data, res){
    if(err){
      console.log(err);
    }

    $scope.categories = (JSON.parse(res)).product_categories;

  })

})


.controller('CategoryCtrl', function(WC, $scope, $stateParams, $localStorage, $rootScope){
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

.controller('ProductCtrl', function($scope, WC, $stateParams, $ionicSlideBoxDelegate,
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

.controller('SignUpCtrl', function($scope, $ionicPopup, $state, WC){

  $scope.newUser = {};
  $scope.newUser.isValid = true;

  $scope.checkUserEmail = function(email){

    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[09]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regex.test(email)){

      $scope.newUser.isValid = false;

      $ionicPopup.show({
        template: "<center>Μη έγκυρο email, παρακαλώ προσπαθήστε ξανά!</center>",
        buttons: [{
          text: 'OK'
        }]
      });

      return;

    }


    var Woocommerce = WC.WC();

    Woocommerce.get('customers/email/'+email,  function(err, data, res){

      if(err)
        console.log(err);

      if(JSON.parse(res).customer){

        $scope.newUser.isValid = false;

        $ionicPopup.show({
          template: "<center>Το email είναι ήδη κατωχυρωμένο. Παρακαλώ συνδεθείτε ή χρησιμοποιήστε διαφορετικό email.</center>",
          buttons: [{
            text: "Είσοδος",
            onTap: function(e){
              $state.go("app.login");
            }
          },{
            text: "OK"
          }]
        })

      }
      else{
        $scope.newUser.isValid = true;
      }

    })
  }


  $scope.switchBillingToShipping = function(){
    $scope.newUser.shipping_address = $scope.newUser.billing_address;
  }


  $scope.signUp = function(newUser){

    var customerData = {};

    customerData.customer = {
        "email": newUser.email,
        "first_name": newUser.first_name,
        "last_name": newUser.last_name,
        "username": newUser.email.split("@")[0],
        "password": newUser.password,
        "billing_address": {
          "first_name": newUser.first_name,
          "last_name": newUser.last_name,
          "company": "",
          "phone": newUser.billing_address.phone,
          "address_1": newUser.billing_address.address,
          "city": newUser.billing_address.city,
          "state": newUser.billing_address.state,
          "postcode": newUser.billing_address.postcode,
          "email": newUser.email

        },
        "shipping_address": {
          "first_name": newUser.first_name,
          "last_name": newUser.last_name,
          "company": "",
          "address_1": newUser.shipping_address.address,
          "city": newUser.shipping_address.city,
          "state": newUser.shipping_address.state,
          "postcode": newUser.shipping_address.postcode,
        }
      }

    var Woocommerce = WC.WC();

    Woocommerce.post('customers', customerData, function(err, data, res){
      if(err)
        console.log(err);

      if(JSON.parse(res).customer){

        $ionicPopup.show({
          title: "Συγχαρητήρια",
          template: "Ο λογαριασμός σας δημιουργήθηκε με επιτυχία. Παρακαλώ εισέλθετε στην εφαρμογή",
          buttons: [{
            text: "Είσοδος",
            type: "button-assertive",
            onTap: function(e){
              $state.go('app.login');
            }
          }]
        })
      }
      else{
        $ionicPopup.show({
          title: "OOPS",
          template: JSON.parse(res).errors[0].message,
          buttons: [{
            text: "OK",
            type: "button-assertive"
          }]
        })
      }
    });

  }

})

.controller('LoginCtrl', function($scope, $http, $localStorage, $ionicPopup, $state, WC, $ionicHistory){
  $scope.login = function(userData){

    $http.get('http://www.eblokomobile.eu/api/auth/generate_auth_cookie/?insecure=cool &username='
    +userData.username+'&password='+userData.password)
    .then(function(response){
      console.log(response);

      if(response.data.user){
        $localStorage.userData = response;
        $ionicPopup.show({
          title: 'Καλως ήρθατε ' + response.data.user.displayname,
          template: '<center>Έχετε εισέλθει επιτυχώς.</center>',
          buttons: [{
            text: 'OK',
            onTap: function(e){
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
      else{
        $ionicPopup.show({
          title: 'Σφάλμα! Παρακαλώ ελέγξτε',
          template: '<center>Παρακαλώ ελέγξτε το όνομα χρήστη και τον κωδικό.</center>',
          buttons: [{
            text: 'Προσπαθήστε ξανά'
          }]
        })
      }
    });
  }
})


.controller('CheckoutCtrl', function($scope, $localStorage, $ionicPopup, $ionicHistory, WC, $state){

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


.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicGesture, $ionicLoading) {
   $scope.show();
  var options = {timeout: 10000, enableHighAccuracy: true};



  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center:  {lat: 38.6869452, lng: 24.176820},
      zoom: 6,
      zoomControl: true,
      zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_CENTER},
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

   var marker1 = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: {lat: 37.95864, lng: 23.67569}
   });


   var contentString1 =
            "Διεύθυνση: Κηφισού 18, Αγ. Ι. Ρέντης, Αθήνα"+'<br>'+"Τ.Κ.: 18233"+'<br>'+"Τηλ: 210 4819880"+'<br>'+"Fax: 2105234298"+'<br>'+
            "Ωράριο λειτουργίας: Δευτέρα - Παρασκευή: 11.00-20.00, Σάββατο: 10.0016.00"+'<br>'+
            '</div>';

   var infoWindow1 = new google.maps.InfoWindow({
      content: contentString1
   });
       google.maps.event.addListener(marker1, 'click', function () {
      infoWindow1.open($scope.map, marker1);
   });

  var marker2 = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: {lat: 37.981014, lng: 23.729094}
   });

  var contentString2 =
          "Διεύθυνση: Ευριπίδου 46, Αθήνα"+'<br>'+"Τ.Κ.: 10552"+'<br>'+"Τηλ: 210 3254232"+'<br>'+
          "Ωράριο λειτουργίας: Δευτέρα - Σάββατο: 08.00-17.00"+'<br>'+


         '</div>';

   var infoWindow2 = new google.maps.InfoWindow({
      content: contentString2
   });
       google.maps.event.addListener(marker2, 'click', function () {
      infoWindow2.open($scope.map, marker2);
   });

   var marker3 = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: {lat: 40.663754, lng: 22.882429}
   });


    var contentString3 =
            "Διεύθυνση: Νέα Περιφερειακή οδός και πάροδος Σοφοκλή Βενιζέλου, Θεσσαλονίκη "+'<br>'+"Τ.Κ.: 54628"+'<br>'+"Τηλ.: 2310 755511 Fax: 2310 778021"+'<br>'
            +"Ωράριο λειτουργίας: Δευτέρα - Παρασκευή: 11.00-20.00, Σάββατο: 10.0016.00"+ '<br>'+
           '</div>';



   var infoWindow3 = new google.maps.InfoWindow({
      content: contentString3
   });
    google.maps.event.addListener(marker3, 'click', function () {
      infoWindow3.open($scope.map, marker3);
   });

   var marker4 = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: {lat: 40.6357787, lng: 22.941974}
   });

   var contentString4 =
            "Διεύθυνση: Ασκητού 29-31, Αγορά Καπάνι, Θεσσαλονίκη"+'<br>'+" Τ.Κ.: 54624"+'<br>'+ "Τηλ.: 2310 242272"+'<br>'+
            "Ωράριο λειτουργίας: Δευτέρα - Σάββατο: 08.00-17.00"+ '<br>'+
          '</div>';


   var infoWindow4 = new google.maps.InfoWindow({
      content: contentString4
   });


  google.maps.event.addListener(marker4, 'click', function () {
      infoWindow4.open($scope.map, marker4);
   });

    });
     $scope.hide();

  }, function(error){
    console.log("Could not get location");


  });


})


.controller('ContactCtrl', function($scope, $ionicPopup, $state, $http) {
  $scope.contact = {};
  $scope.contact.email = "";
  console.log($scope.contact.email);
  $scope.checkUserEmail = function(email) {
    //alert("runnning checkUserEmail, check console for results")

    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[09]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {

      console.log("Email is invalid");

      $ionicPopup.show({
        template: "<center>Μη έγκυρο email, παρακαλώ προσπαθήστε ξανά!</center>",
        buttons: [{
          text: 'OK'
        }]
      });

      return;

    }
    else{
      console.log("Email is valid");
    }
  }

  $scope.Contact = function(newMessage) {


    var contactData = {};

    contactData.contact = {
      "name": newMessage.name,
      "email": newMessage.email,
      "message": newMessage.message

    }

  var config = {
    method: 'POST',
    url: 'http://www.eblokomobile.eu/sendmail.php',
    data: { mailTo: 'gtopkharas@hotmail.com', msg: '$scope.message' }
      }

  $scope.sendMail = function(){

    var response = $http(config);

    response.success(function(data,status){
        console.log('Sent');
    });

    response.error(function(data,status){


        console.log('Error');
    });
  }

      console.log(data);

  }

})

.directive('browseTo', function ($ionicGesture) {
 return {
  restrict: 'A',
  link: function ($scope, $element, $attrs) {
   var handleTap = function (e) {
    // todo: capture Google Analytics here
    var inAppBrowser = window.open(encodeURI($attrs.browseTo), '_system');
   };
   var tapGesture = $ionicGesture.on('tap', handleTap, $element);
   $scope.$on('$destroy', function () {
    // Clean up - unbind drag gesture handler
    $ionicGesture.off(tapGesture, 'tap', handleTap);
   });
  }

 }
})

.directive('rotateBurger', function($ionicSideMenuDelegate, $timeout) {
    var directiveDefinitionObject = {
        restrict: 'A',
        link: postLink
    };

    function postLink(scope, element, attributes) {

        var rotateBurgerTimeout = $timeout(function() {
            // Watch for changes to the openRatio which is a value between 0 and 1 that says how "open" the side menu is
            scope.$watch(function() {
                    return $ionicSideMenuDelegate.getOpenRatio();
                },
                function(ratio) {
                    // use translate3d/rotate3d property for smoother animation in ionic
                    if (ratio >= 0) {
                        // BUTTON TURNS TO X
                        element.children()[0].style.transform = 'rotate3d(0, 0, 1, ' + (ratio * 45) + 'deg)';
                        element.children()[0].style.top = '0' + (ratio * 10) + 'px';
                        // element.children()[0].style.width = (100 + (ratio * 5)) + '%';

                        element.children()[0].style.height = (3 - (ratio * 2)) + 'px';

                        element.children()[1].style.opacity = (1 - ratio * 5);
                        element.children()[1].style.left = -ratio * 40 + 'px';
                        element.children()[1].style.height = (3 - (ratio * 3)) + 'px';

                        element.children()[2].style.transform = 'rotate3d(0, 0, 1, ' + (ratio * -45) + 'deg)';
                        element.children()[2].style.top = (14 - (ratio * 4)) + 'px';
                        // element.children()[2].style.width = (23 + (ratio * 5)) + 'px';
                        element.children()[2].style.height = (3 - (ratio * 2)) + 'px';
                    }
                });
        });

        scope.$on('$destroy', function(event) {
            $timeout.cancel(rotateBurgerTimeout);
        });
    } // postLink ends
    return directiveDefinitionObject;
})

.controller('BarcodeCtrl', function($scope, WC, $rootScope, $cordovaBarcodeScanner, $ionicPlatform, $ionicLoading) {
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

.controller('TrackingCtrl' , function($scope, $ionicLoading, $state, $stateParams)
      {

   })



.controller('OrdersCtrl', function($rootScope, $scope, $stateParams,$localStorage, WC, $ionicModal, $ionicLoading) {

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
