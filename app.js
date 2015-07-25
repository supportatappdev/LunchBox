// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('tab', {
	    url: "/tab",
	    abstract: true,  
	    templateUrl: "tabs.html"
	  })
  .state('tab.order', {
    url: '/order',
    views: {
      'tab-order': {
        templateUrl: 'order.html',
        controller: 'OrderCtrl'
      }
    }
  })
  .state('tab.payment', {
	    url: '/payment/:order',
	    views: {
	      'tab-order': { 
	        templateUrl: 'payment.html',
	        controller: 'PaymentCtrl'
	      }
	    }
  })
  
  .state('tab.paypal', {
	    url: '/paypal',
	    views: {
	      'tab-order': { 
	        templateUrl: 'paypal.html',
	        controller: 'PayPalCtrl'
	      }
	    }
	  })
  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'tab-settings.html',
        controller: 'SettingsCtrl'
      } 
    }
  })
.state('tab.history', {
    url: '/history',
    views: {
      'tab-history': {
        templateUrl: 'history.html',
        controller: 'HistoryCtrl'
      } 
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/order');
});
