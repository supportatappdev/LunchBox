
angular.module('starter')

.controller('LoginCtrl', function($scope,$location) {
	$scope.data = {};
    $scope.login = function() {  
      $location.path("/tab");
    }
    $scope.newuser= function() {  
        $location.path("/newuser");
      }
      
})
.controller('OrderCtrl', function($scope,$location,OrderService,$state,$rootScope,$ionicPopup) {
   
  
    $scope.payNow  =  function() {
      
      if(validationForm($scope.order,$ionicPopup)){
         var operation = 'INSERT';
         var params = {'ds':'lunchBoxOrderRef','operation':operation,
                'data':{
                    'CUST_NAME':$scope.order.username,
                    'MOBILE_NO':$scope.order.moblieNumber,
                    'QUANTITY':$scope.order.quantity,
                    'ITEMTYPE':2,
                    'PAYMENT_MODE':3,
                    'PAYMENT_STATUS':4,
                    'LOCATION':$scope.order.location,
                    
                    }
                };
         
          OrderService.save({'method':'update'},params , function(result){
         
          if (result.status === "E") {
             showMessage("Problem Occured",$ionicPopup); 
          
          } else {
               var orderData=$scope.order;
               $scope.order="";
               $state.go('tab.payment',{order:orderData});
              
          }
      });
   
        
    }   
	 
	}

}) 
.controller('PaymentCtrl', function($scope,$stateParams) {
	
	$scope.order= $stateParams.order;
}) 
.controller('PayPalCtrl', function($scope,$location,$state,$ionicPopup) {

 
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
     
   if(cardDataValidation($scope.order,$ionicPopup)){
       
   var alertPopup = $ionicPopup.alert({
    title: 'Order Confirmation', 
    template: 'Thanks for choosing LunchBox.  Your order ref# is:332332'
   });
   alertPopup.then(function(res) {
           if(res){
            
             $state.go('tab.order');   
            }
     
   });
   
   }
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


function showMessage(message,popup){
    popup.alert({
    title: "", 
    template: "<font color='red'>"+message+"</font>"
   });
}

 //order form validations
function  validationForm(order,popup){
    var isvalid=true;
    
    if(order){
   
    if(!order.username){
        showMessage("Please enter username",popup);
        isvalid=false;
        return isvalid;
      }
       if(!order.username){
        showMessage("Please enter user name",popup);
        isvalid=false;
        return isvalid;
      }
      if(!order.moblieNumber){
        showMessage("Please enter moblie number",popup);
        isvalid=false;
        return isvalid;
      }
      if(!order.quantity){
        showMessage("Please enter quantity",popup);
        isvalid=false;
        return isvalid;
      }
      if(!order.location){
        showMessage("Please enter location",popup);
        isvalid=false;
        return isvalid;
      }
    }else{
       showMessage("Please enter order details",popup);
        isvalid=false;
        return isvalid; 
    }
    
    return isvalid;
}
// card details validations
function cardDataValidation(order,popup){
     var isvalid=true;
     if(order){
     if(!order.number){
        showMessage("Please enter card number",popup) ;
        isvalid=false;
        return isvalid;
      }
       if(!order.month){
        showMessage("Please enter expiry month",popup) ;
        isvalid=false;
        return isvalid;
      }
        if(!order.year){
        showMessage("Please enter expiry year",popup) ;
        isvalid=false;
        return isvalid;
      }
      
       if(!order.cvv){
        showMessage("Please enter CVV",popup) ;
        isvalid=false;
        return isvalid;
      }
      
   }else{
        showMessage("Please enter card details",popup) ;
        isvalid=false;
        return isvalid; 
    }
    return isvalid;
}