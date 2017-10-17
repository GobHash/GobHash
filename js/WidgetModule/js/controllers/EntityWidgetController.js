(function () {
    'use strict';

    angular.module("Widgets")
        .controller("EntityWidgetController", entityWidgetController)
        .component("widgetEntity", {
            templateUrl: "js/WidgetModule/views/widgetData.html",
            controller: "EntityWidgetController",
            controllerAs: "vmWidgetData"
        });

    entityWidgetController.$inject = [
        "$scope",
        "$rootScope",
        "$state",
        "$stateParams",
        "EntitiesService",
        "blockUI"
    ];

    function entityWidgetController($scope, $rootScope, $state, $stateParams, EntitiesService, blockUI) {
        var vm = this;
        vm.dataBlockUI = blockUI.instances.get('dataBlock');
        getDefinition();
        vm.valueColumn = null;
        vm.selectValueOp = null;
        
        getEntitites();
        getColumnsByEntity();
        getOperationsByType();
        getValueOperation();
        getAllColumns();
        getColumsForOperations();
        
        vm.stepTree = stepTree;
        vm.backStepOne = backStepOne;
        vm.getColumnsByEntity = getColumnsByEntity;
        vm.getOperationsByType = getOperationsByType;
        vm.getOperationsByColumnType = getOperationsByColumnType;
        vm.getStringsOperations = getStringsOperations;
        vm.getIntOperations = getIntOperations;
        vm.close = close;
        //getColumnsByEntity();


        function getEntitites(){
            vm.dataBlockUI.start();
            vm.entitiesType = EntitiesService.getEntities().then(function(data){
                vm.entitiesType = data
            }).catch(function(err){
                console.log(err);
            }).finally(function(){
                vm.dataBlockUI.stop()
            });
        }

        function getDefinition(){
            vm.definition = EntitiesService.getDefinition();
        }

        function getValueOperation(){
            vm.valueOperation = EntitiesService.getValueOperation()
        }

        function getAllColumns(){
            vm.dataBlockUI.start();
            EntitiesService.getAllColumns().then(function(data){
                vm.allColumns = data;
            }).catch(function(err){
                console.log(err);
            }).finally(function(){
                getColumsForOperations();
                vm.dataBlockUI.stop();
            })
        }

        function getColumnsByEntity(){
            vm.dataBlockUI.start();
            if(vm.definition.entity != null){
                vm.columns = EntitiesService.getColumnsByEntity(vm.definition.entity.id)
                    .then(function(data){
                        vm.columns = data;
                    }).catch(function(err){
                        console.log(err);
                    }).finally(function(){
                        vm.dataBlockUI.stop();
                    });
            }
        }

        function setEntityInDefinition(){
            EntitiesService.setEntity(vm.definition.entity)
        }

        function setBaseColumnInDefinition(){
            EntitiesService.setBaseColumn(vm.definition.baseColumn)
        }

        function backStepOne(){
            setEntityInDefinition();
            setBaseColumnInDefinition();
            setCategory();
            console.log(vm.columns);
            $state.go('widgetIndex');
        }
        function setCategory(){
            EntitiesService.setCategory(vm.selectValueOp, vm.valueColumn);
        }

        function stepTree(){
            if(vm.dataForm.$valid){
                setEntityInDefinition();
                setBaseColumnInDefinition();
                setCategory();
                console.log(vm.definition);
                $state.go('widgetFilter');
            }
            else{
                vm.alert = "Por favor complete los campos necesarios";
            }
            
        }
        function getOperationsByType(){
            vm.dataBlockUI.start()
            EntitiesService.getOperationsByType(2).then(function(data){
                vm.operations = data;
                getStringsOperations()
                getIntOperations()
            }).catch(function(err){
                console.log(err);
            }).finally(function(){
                vm.dataBlockUI.stop();
            });
        }

        function getOperationsByColumnType(columnType){
            vm.operationsByType = EntitiesService.getOperationsByColumnType(vm.operations, columnType)
        }

        function getColumsForOperations(){
            vm.operationColumns = EntitiesService.getColumnsForFilters();
            console.log(vm.operationColumns);
        }

        function getStringsOperations(){
            vm.stringOperations = EntitiesService.getOperationsByColumnType(vm.operations, 1);
        }

        function getIntOperations(){
            vm.intOperations = EntitiesService.getOperationsByColumnType(vm.operations, 2);
        }

        function close(){
            EntitiesService.reset();
            $state.go("add_post")
        }
        console.log(vm.definition);

    }
    
})();
