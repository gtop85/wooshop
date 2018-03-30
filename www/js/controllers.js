angular.module('starter.controllers', [])

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

.controller('TrackingCtrl' , function($scope, $ionicLoading, $state, $stateParams)
      {

   })
