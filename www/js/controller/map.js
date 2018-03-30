starter.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicGesture, $ionicLoading) {
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
