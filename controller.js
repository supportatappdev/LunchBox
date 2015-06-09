angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope,$location) {
	$scope.data = {};
    $scope.login = function() {  
      $location.path("/tab");
    }
    $scope.newuser= function() {  
        $location.path("/newuser");
      }
      
})
.controller('OrderCtrl', function($scope,$location) {
	$scope.payments  =  function() {
		$location.path("/tab/payment");
	}
}) 
.controller('PaymentCtrl', function($scope) {
	
	
}) 
.controller('PayPalCtrl', function($scope,$location,$state,$ionicPopup) {
	//PayPalCtrl
 $scope.payment = function() {  
	 $state.go("tab.order"); 
 }
    
  // Triggered on a button click, or some other target
$scope.showPopup = function() {
  $scope.data = {}
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });
  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };
 // A confirm dialog
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Consume Ice Cream',
     template: 'Are you sure you want to eat this ice cream?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }  
   });     
 };

 // An alert dialog 
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
    title: 'Order Confirmation', 
     template: 'Thanks for choosing LunchBox.  Your order ref# is:332332'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
})
 .controller('HistoryCtrl', function($scope,$location,$state) {
		//PayPalCtrl
	 $scope.back = function() {
		 $state.go("tab.order");
	 }
})
.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
