angular.module('ClientsApp')
    .directive('formField', function($rootScope){
        return {
            restrict : 'EA',
            templateUrl : 'views/form-field.html',
            replace : true,
            scope : {
                record : '=',
                field : '@',
                required : '@',
                type : '@'
            },
            link : function($scope, element, attr){
                $scope.$on('record:invalid', function(){
                    $scope[$scope.field].$setDirty();
                })
            }
        }
    })
    .directive('providerField', function($rootScope, Provider){
        return {
            restrict : 'EA',
            templateUrl : 'views/provider-field.html',
            replace : true,
            scope : {
                field : '@'

            },
            link : function($scope, element, attr){
                $scope.provider = new Provider({
                    name : ''
                });

                $scope.newProvider = function(){
                    if($scope.providerName == undefined){
                        return $scope.newProviderForm.name.$setDirty();
                    }
                    new Provider({
                        name : $scope.providerName
                    })
                    .$save()
                    .then(function(){
                        $rootScope.$broadcast('updateProviderList');
                        $rootScope.$broadcast('updateClientList');
                    })
                }
            }
        }
    })
    .directive('providersWidget', function(Provider, $rootScope){
        return {
            restrict : 'EA',
            templateUrl : 'views/providers-widget.html',
            replace : true,
            link : function($scope, element, attr){

                $scope.$on('updateProviderList', function(){
                    $scope.providers = Provider.query();
                });
                $rootScope.selectedProviders = [];
                if($scope.client){
                    angular.forEach($scope.client.Providers, function(v){
                        $rootScope.selectedProviders.push({id : v.id});
                    })
                }
                $scope.findIdInProviders = function checkAndAdd(id) {
                    var found = $rootScope.selectedProviders.some(function (el) {
                        return el.id === id;
                    });
                    if (!found) return false;
                    return true;
                };

                $scope.providers = Provider.query();


                $scope.showEditInput = function(id){
                    element.find('#provider_span_'+id).hide();
                    element.find('#provider_input_'+id).show();
                };

                $scope.editProvider = function(id){
                    var name = element.find('#provider_input_'+id).val();
                    element.find('#provider_input_'+id).hide();
                    element.find('#provider_span_'+id).show();
                    if(name === undefined) return;
                    var provider = Provider.get({id : id });
                    provider.name = name;
                    Provider.update({ id: id }, provider)
                        .$promise
                        .then(function(){
                            $rootScope.$broadcast('updateProviderList');
                            $rootScope.$broadcast('updateClientList');
                        })
                };
                $scope.toggleProviderCheckbox = function(id){
                    var index = $.grep($rootScope.selectedProviders, function(e){ return e.id == id; });
                    if(index.length > 0){
                        $rootScope.selectedProviders = $.grep($rootScope.selectedProviders, function(e){
                            return e.id != id;
                        });
                    }else{
                        $rootScope.selectedProviders.push({id : id})
                    }
                };

                $scope.deleteProvider = function(id){
                    Provider.delete({
                        id: id
                    })
                    .$promise
                    .then(function(){
                        $rootScope.$broadcast('updateProviderList');
                        $rootScope.$broadcast('updateClientList');
                        $scope.toggleProviderCheckbox(id);

                    })
                }
            }
        }
    });