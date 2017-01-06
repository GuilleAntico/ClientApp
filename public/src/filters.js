angular.module('ClientsApp')
    .filter('showOnlyNames', function(){
        return function(input){
            if(!input) return '';

            var providerNames = [];
            angular.forEach(input , function(provider){
                providerNames.push(provider.name);
            });
            return providerNames.join(', ');
        }
    })
    .filter('labelCase', function(){
       return function (input) {
           input = input.replace('/([A-Z])/g', ' $1');
           return input[0].toUpperCase() + input.slice(1);
       } 
    });
