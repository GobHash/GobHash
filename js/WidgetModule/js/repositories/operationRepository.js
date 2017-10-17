(function(){
	'use strict';

	angular
	.module('Widgets')
    .factory('OperationRepository', OperationRepository);
    
    OperationRepository.$inject = ['$http'];

	function OperationRepository($http){
        var repository = {
            getOperationsByOperationType: getOperationsByOperationType,
            getAllOperations : getAllOperations
        };

        return repository;

        function getOperationsByOperationType(operationType){
            return $http({

                "method": "GET", 
                "url": "https://api-dev.gobhash.com/v1/operations/type/" + operationType,
                "data" : {},
                "params" : {
                },
                "headers": {
                }
            }).then(function (response) {
                return response.data;
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });
        }

        function getAllOperations(){
            return $http({

                "method": "GET", 
                "url": "https://api-dev.gobhash.com/v1/operations/operations",
                "data" : {},
                "params" : {
                },
                "headers": {
                }
            }).then(function (response) {
                return response.data;
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });
        }
    }

})();