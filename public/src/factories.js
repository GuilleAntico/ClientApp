angular.module('ClientsApp')
    .factory('Client', function($resource){
        return $resource('/api/clients/:id', { id : '@id'}, {
           'update' : { method : 'PUT' }
        })
    })
    .factory('Provider', function($resource){
        return $resource('/api/providers/:id', { id : '@id'}, {
            'update' : { method : 'PUT' }
        })
    })
