starter.controller('SignUpCtrl', function($scope, $ionicPopup, $state, WC){

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
