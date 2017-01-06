angular.module('ClientsApp')
    .controller('ClientsController', function($scope, $rootScope, $uibModal, Client){

        $scope.$on('updateClientList', function(){
            $scope.clients = Client.query();
        });
        $scope.clients = Client.query();
        $scope.sort = function(field){
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };
        $scope.fields = ['name', 'email', 'phone', 'providers'];
        $scope.sort.field = 'name';
        $scope.sort.order = false;

        $scope.editClientModal = function(id) {
            Client.get({id : id})
                .$promise
                .then(function(client){
                    $rootScope.client = client;
                    $uibModal.open({
                        templateUrl : 'views/editClientModal.html',
                        controller : 'EditClientController',
                        size : 'lg',
                        backdrop : false

                    });
                })


        };
        $scope.newClientModal= function(){
            $uibModal.open({
                templateUrl : 'views/newClient.html',
                controller : 'NewClientController',
                size : 'lg',
                backdrop : false
            })
        };

        $scope.deleteClient = function(id){
            Client.delete({
                id: id
            })
                .$promise
                .then(function(){
                    $scope.$broadcast('updateClientList');
                })
        }
    })
    .controller('EditClientController', function($scope, $rootScope, $uibModalInstance, Client){

        $scope.updateClient = function(){
            $rootScope.client.Providers = $rootScope.selectedProviders;
            var id = $rootScope.client.id;

            if($scope.editClientForm.$invalid){
                $scope.$broadcast('record:invalid');
            }else{
                Client.update({ id: id }, $rootScope.client)
                    .$promise
                    .then(function(){
                        $rootScope.$broadcast('updateClientList');
                        $uibModalInstance.close();

                    })
            }

        };

        $scope.cancel = function(){
            $uibModalInstance.close();
        }
    })
    .controller('NewClientController', function($scope, Client, $rootScope, $uibModalInstance){

       $scope.client = new Client({
           name: '',
           email: '',
           phone: '',
           Providers : []
       });
        $scope.save = function(){

            if($scope.newClientForm.$invalid){
                $scope.$broadcast('record:invalid');
            }else{
                $scope.client.Providers = $rootScope.selectedProviders;
                $scope.client
                    .$save()
                    .then(function(){
                        $rootScope.$broadcast('updateClientList');
                        $uibModalInstance.close();
                    })
            }
        };

        $scope.cancel = function(){
            $uibModalInstance.close();
        }
    });