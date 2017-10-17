(function(){
	'use strict';

	angular
	.module('Widgets')
	.factory('FilterService', FilterService);

	FilterService.$inject = ['$http', 'OperationRepository'];

	function FilterService($http, OperationRepository){
        var filters = [
            {
                column: null,
                operation: null,
                value: null
            }
        ];

        var dateFilters = [
            {
                column: null,
                operation: null,
                date1: null,
                date2: null
            }
        ];

        var dateFilter = null;
        var dateOperationsFilters = null;

        var filterOperationsType = [

        ];
        var service = {
            filters : filters,
            dateFilters : dateFilters,
            filterOperationsType: filterOperationsType,
            getFilters: getFilters,
            getDateFilters: getDateFilters,
            setFilters: setFilters,
            setDateFilters : setDateFilters,
            getFilterOperationsType : getFilterOperationsType,
            dateFilter: dateFilter,
            getDateOperationFilters: getDateOperationFilters,
            dateOperationsFilters: dateOperationsFilters,
            getFilterOperationsByType : getFilterOperationsByType
        }
        return service;

        function getFilters(){
            return service.filters;
        }

        function getDateFilters(){
            return service.dateFilters;
        }

        function setFilters(listOfFilters){
            service.filters = listOfFilters;
        }

        function setDateFilters(listFilters){
            service.dateFilters = listFilters;
        }

        function getFilterOperationsType(){
            service.filterOperationsType = [
                {
                    id: 1,
                    operation: "Igual a"
                },
                {
                    id: 2,
                    operation: "Diferente de"
                },
                {
                    id: 3,
                    operation: "Contiene"
                },
                {
                    id: 4,
                    operation: "Mayor que"
                },
                {
                    id: 5,
                    operation: "Menor que"
                }
            ];
            return service.filterOperationsType;
        }

        function getDateOperationFilters(){
            service.dateOperationsFilters = [
                
                {
                    id: 1,
                    operation: 'Ultima Semana'
                },
                {
                    id: 2,
                    operation: 'Ultimo Mes'
                },
                {
                    id: 3,
                    operation: 'Ultimos 6 Meses'
                },
                {
                    id: 4,
                    operation: 'Ultimo año'
                },
                {
                    id: 5,
                    operation: 'Entre'
                }
            ]
            return service.dateOperationsFilters;
        }

        function getFilterOperationsByType(type){
            return OperationRepository.getOperationsByOperationType(type)
            .then(function(data){
                return data;
            }).catch(function(err){
                return err;
            });
        }
    }
})();