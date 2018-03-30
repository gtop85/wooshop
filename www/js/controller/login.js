starter.controller('LoginCtrl', function($scope, $http, $localStorage, $ionicPopup, $state, WC, $ionicHistory){
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
