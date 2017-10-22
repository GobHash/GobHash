(function () {
    'use strict';

    angular.module("Widgets")
        .controller("FilterWidgetController", filterWidgetController)
        .component("widgetFilter", {
            templateUrl: "js/WidgetModule/views/widgetFilter.html",
            controller: "FilterWidgetController",
            controllerAs: "vmWidgetFilter"
        });

    filterWidgetController.$inject = [
        "$scope",
        "$rootScope",
        "$state",
        "$stateParams",
        "EntitiesService",
        "FilterService"
    ];

    function filterWidgetController($scope, $rootScope, $state, $stateParams, EntitiesService, FilterService) {
        var vm = this;
        vm.definition = EntitiesService.getDefinition();
        vm.filters = FilterService.getFilters();
        vm.numberOfFilters = [1];
        vm.filter = {
            column: null,
            operation: null,
            value: null
        }
        vm.dateFilters = FilterService.getDateFilters();
        vm.dateFilter = vm.definition.dateFilter;

        getFiltersOperationsType();
        getAllColumns();
        getDateOperationFilters();
        getColumnsForFilters();
        getFilterOperationsByType(1);
        getColumnsForDateFilters();

        //StartDate
        vm.dpOpen = false;
        vm.dpFormat = 'dd/MM/yy';
        vm.dpOptions = {
            datepickerMode: 'day',
            minMode: 'day'
        }
        
        //EndDate
        vm.dpeOpen = false;
        vm.dpeFormat = 'dd/MM/yy';
        vm.dpeOptions = {
            datepickerMode: 'day',
            minMode: 'day'
        }
        
        //Functions
        vm.stepFour = stepFour;
        vm.stepTree = stepTree;
        vm.addFilter = addFilter;
        vm.deleteFilter = deleteFilter;
        vm.reset = reset;
        vm.getOperationsByColumnType = getOperationsByColumnType;
        vm.getColumnsForDateFilters = getColumnsForDateFilters;
        vm.addDateFilter = addDateFilter;
        vm.getFilterOperationsByType = getFilterOperationsByType;
        vm.save = save;
        vm.deleteDateFilter = deleteDateFilter;
        vm.getIntOperations = getIntOperations;
        vm.getStringOperations = getStringOperations;

        function stepFour(){
            if(vm.filterForm.$valid){
                setFilters();
                setDateFilter();
                EntitiesService.getPreviewData().then(function(data){
                    EntitiesService.setData(data);
                    $state.go('widgetPreview');
                }).catch(function(err){
                    console.log(err)
                }).finally(function(){
                });
            }
            else{
                vm.alert = "Por favor complete los campos necesarios";
            }
        };
        function stepTree(){
            setFilters();
            setDateFilter();
            $state.go('widgetEntity');
        }

        function getFiltersOperationsType(){
            vm.filterOperations = FilterService.getFilterOperationsType();
        }

        function getAllColumns(){
            EntitiesService.getAllColumns().then(function(data){
                vm.allColumns =  data;
            }).catch(function(err){
                console.log(err);
            })
        }

        function addFilter(){
            vm.filters.push(
                {
                    column: null,
                    operation: null,
                    value: null
                }
            );   
        }

        function addDateFilter(){
            vm.dateFilters.push(
                {
                    column: null,
                    operation: null,
                    value: null
                }
            );   
        }

        function reset(){
            
            EntitiesService.reset();
            $state.go("add_post");
        }

        function deleteFilter(filter){
            var i = vm.filters.indexOf(filter);
            if(i != -1) {
                vm.filters.splice(i, 1);
            }
        }
        function deleteDateFilter(filter){
            var i = vm.dateFilters.indexOf(filter);
            if(i != -1) {
                vm.dateFilters.splice(i, 1);
            }
        }
        

        function setFilters(){
            FilterService.setFilters(vm.filters);
            vm.definition.filters = vm.filters;
            EntitiesService.setFilters(vm.filters);
        }

        function setDateFilter(){
            FilterService.setDateFilters(vm.dateFilters)
            vm.definition.dateFilters = vm.dateFilters;
            EntitiesService.setDateFilters(vm.dateFilters);
        }

        function getDateOperationFilters(){
            vm.dateOperationFilter = FilterService.getDateOperationFilters();
        }

        function getColumnsForFilters(){
            vm.filterColumns = EntitiesService.getColumnsForFilters()
        }

        function getFilterOperationsByType(type){
            FilterService.getFilterOperationsByType(type).then(function(data){
                vm.operations = data;
            }).catch(function(err){
                console.log(err);
            }).finally(function(){
                getOperationsForDateColumns(vm.operations, 5);
                getStringOperations(vm.operations, 1);
                getIntOperations(vm.operations, 4)

            })
        }

        function getOperationsByColumnType(columnType){
            vm.operationsByType = EntitiesService.getOperationsByColumnType(vm.operations, columnType)
        }

        function getStringOperations(){
            vm.stringOperations = EntitiesService.getOperationsByColumnType(vm.operations, 1)
        }
        function getIntOperations(){
            vm.intOperations = EntitiesService.getOperationsByColumnType(vm.operations, 4)
        }

        function getColumnsForDateFilters(){
            vm.dateColumns = EntitiesService.getColumnsForDateFilters();
        }

        function getOperationsForDateColumns(){
            vm.operationsDate = EntitiesService.getOperationsByColumnType(vm.operations, 5)
        }

        function save(){
            if(vm.filterForm.$valid){
                setFilters();
                setDateFilter();
                EntitiesService.getPreviewData().then(function(data){
                    EntitiesService.setData(data);
                }).catch(function(err){
                    console.log(err)
                }).finally(function(){
                    EntitiesService.setHash();
                    $rootScope.SetGraphic();
                    EntitiesService.reset();
                    $state.go("add_post");
                });
            }

            
        }

    }
    
})();
