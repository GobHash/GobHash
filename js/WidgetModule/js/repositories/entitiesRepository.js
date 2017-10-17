(function(){
	'use strict';

	angular
	.module('Widgets')
    .factory('EntitiesRepository', EntitiesRepository);
    
    EntitiesRepository.$inject = ['$http'];

	function EntitiesRepository($http){
        var repository = {
            getEntities: getEntities,
            getColumnsByEntity: getColumnsByEntity,
            getColumns: getColumns,
            getPreviewData : getPreviewData
        };

        return repository;

        function getEntities(){
            return $http({

                "method": "GET", 
                "url": "https://api-dev.gobhash.com/v1/entity/entities",
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

        function getColumnsByEntity(id){
            return $http({

                "method": "GET", 
                "url": "https://api-dev.gobhash.com/v1/column/columns/" + id,
                "data" : {
                },
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

        function getColumns(){
            return $http({

                "method": "GET", 
                "url": "https://api-dev.gobhash.com/v1/column/columns",
                "data" : {},
                "params" : {},
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

        function getPreviewData(definition){
            return $http({

                "method": "POST", 
                "url": "https://api-dev.gobhash.com/v1/widgets/preview",
                "data" : {'definition':definition},
                "params" : {},
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