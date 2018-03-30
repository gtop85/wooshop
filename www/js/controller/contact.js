starter.controller('ContactCtrl', function($scope, $ionicPopup, $state, $http) {
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
