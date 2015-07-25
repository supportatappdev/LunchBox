


//var _apName = getAppName(window.location.pathname);


var baseUrl = getBaseURL()+"/api/";

angular.module('starter').factory("OrderService", function($resource) {
return $resource(baseUrl + ':method', {'8180':':8180'}, {
query: {
	method: 'POST',
	params: {},
	isArray: false
},
save: {
	method: 'POST',
	params: {},
	isArray: false
},
invoke: {
	method: 'POST',
	params: {},
	isArray: false
},
saveAll: {
	method: 'POST',
	params: {},
	isArray: true
}
});
});


function getBaseURL() {
   return location.protocol + "//" + location.hostname + 
      (location.port && ":" + location.port) ;
}
