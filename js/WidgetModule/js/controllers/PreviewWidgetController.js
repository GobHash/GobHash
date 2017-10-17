(function () {
    'use strict';

    angular.module("Widgets")
        .controller("PreviewWidgetController", previewWidgetController)
        .component("widgetPreview", {
            templateUrl: "js/WidgetModule/views/widgetPreview.html",
            controller: "PreviewWidgetController",
            controllerAs: "vmWidgetPreview"
        });

    previewWidgetController.$inject = [
        "$scope",
        "$rootScope",
        "$state",
        "$stateParams",
        "EntitiesService"
    ];

    function previewWidgetController($scope, $rootScope, $state, $stateParams, EntitiesService) {
        var vm = this;
        vm.definition = EntitiesService.getDefinition();
        vm.widgetType = vm.definition.widgetType.id;
        vm.widgetData = EntitiesService.getData();
        vm.widgetLabels =  vm.widgetData[1];
        vm.widgetValues = vm.widgetData[0];
        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 240]
        ];

        vm.stateBack = stateBack;

        function stateBack(){
            $state.go('widgetFilter');
        }

        
    }
    
})();
