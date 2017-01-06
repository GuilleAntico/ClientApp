angular.module('ClientsApp', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function($routeProvider, $locationProvider){
        $routeProvider
            .otherwise({
                controller : 'ClientsController',
                templateUrl : 'views/clients.html'
            });
        $locationProvider.html5Mode(true);
    });