(function () {
    'use strict';

    angular.module("Widgets")
        .controller("CreateWidgetController", createWidgetController)
        .component("widgetIndex", {
            // templateUrl: "js/WidgetModule/views/widgetIndex.html",
            template: "<div>Test</div>",
            controller: "CreateWidgetController",
            controllerAs: "vmWidgetIndex"
        });
    //Nuevos servicios y repositorios
    createWidgetController.$inject = [
        "$scope",
        "$rootScope",
        "$state",
        "$stateParams",
        "EntitiesService"
    ];

    function createWidgetController($scope, $rootScope, $state, $stateParams, EntitiesService) {
        var vm = this;
        
        vm.definition = {
            name : null,
            widgetType : null
        }
        
        vm.stepTwo = stepTwo;
        vm.close = close;
        getEntitites()
        function getEntitites(){
            vm.widgetsType = EntitiesService.getWidgets();
        }
        function stepTwo(){
            if(vm.indexForm.$valid){
                setDefinition();
                console.log(vm.definition);
                $state.go('widgetEntity');
            }
            else{
                vm.alert = "Por favor complete los campos necesarios"
            }
        }

        function setDefinition(){
            EntitiesService.setBasicDefinition(vm.definition);
        }

        function close(){
            EntitiesService.reset();
            $state.go("add_post")
        }
        
    }
    
})();
