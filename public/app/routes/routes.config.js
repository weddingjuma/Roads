/*global angular*/
'use strict';

angular.module('Roads').config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/roads");
  
  $stateProvider
    .state('roads', {
      url: "/roads",
      templateUrl: "app/partials/roads.html"
    })
    .state('slow-roads', {
      url: "/slow-roads",
      templateUrl: "app/partials/slow-roads.html",
    })
    .state('closed-roads', {
      url: "/closed-roads",
      templateUrl: "app/partials/closed-roads.html"
    })
    .state('roads-in-work', {
      url: "/roads-in-work",
      templateUrl: "app/partials/roads-in-work.html"
    });
    
});