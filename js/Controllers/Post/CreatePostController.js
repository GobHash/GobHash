(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['$rootScope','$scope', 'EntitiesService', '$state', 'PostService'];
    function CreatePostController($rootScope, $scope, EntitiesService, $state, PostService) {
        let vm = this;
        $scope.UpdateHeader();
        $rootScope.SetGraphic = SetGraphic;

        vm.CreatePost = CreatePost;
        vm.AddGraphic = AddGraphic;
        vm.GetPreview = GetPreview;
        vm.SetGraphic = SetGraphic;

        vm.postData = {
            title: '',
            description: '',
            dashboard: {
                main: {
                    data: [],
                    definition: {}
                },
                first_submain: {
                    data: [],
                    definition: {}
                },
                second_submain: {
                    data: [],
                    definition: {}
                },
                third_submain: {
                    data: [],
                    definition: {}
                }
            }

        };

        vm.dashboard = {
            main: {},
            first_submain: {},
            second_submain: {},
            third_submain: {},
        }

        vm.dashboardState = {
            hasMain: false,
            first_submain: false,
            second_submain: false,
            third_submain: false
        }

        vm.actualGraphic = {};

        function CreatePost() {
            PostService.CreatePost(vm.postData, function (response) {
                if (response.success) {
                    FlashService.Success('Se creó el post', true);
                } else {
                    FlashService.Error('No se pudo crear el post');
                }
            });
        }

        function AddGraphic(type) {
            console.log('Agregar gráfico tipo: ' + type);
            vm.actualGraphic.number = type;
            $state.go('widgetIndex');
            // vm.SetGraphic();
            console.log('End Graphic');
        }

        // vm.dashboard.main.widgetType;

        function SetGraphic() {
            if (vm.actualGraphic.number === 1) {
                console.log('Is Main Graphic');
                vm.dashboard.main = vm.GetPreview();

                vm.postData.dashboard.main.definition = vm.dashboard.main.definition;
                vm.postData.dashboard.main.data = vm.dashboard.main.widgetData;

                vm.dashboardState.hasMain = true;
            } else if (vm.actualGraphic.number === 2) {
                console.log('Is First Graphic');
                vm.dashboard.first_submain = vm.GetPreview();

                vm.postData.dashboard.first_submain.definition = vm.dashboard.first_submain.definition;
                vm.postData.dashboard.first_submain.data = vm.dashboard.first_submain.data;

                vm.dashboardState.first_submain = true;
            } else if (vm.actualGraphic.number === 3) {
                console.log('Is Second Graphic');
                vm.dashboard.second_submain = vm.GetPreview();

                vm.postData.dashboard.second_submain.definition = vm.dashboard.second_submain.definition;
                vm.postData.dashboard.second_submain.data = vm.dashboard.second_submain.data;

                vm.dashboardState.second_submain = true;
            } else if (vm.actualGraphic.number === 4) {
                console.log('Is Third Graphic');
                vm.dashboard.third_submain = vm.GetPreview();

                vm.postData.dashboard.third_submain.definition = vm.dashboard.third_submain.definition;
                vm.postData.dashboard.third_submain.data = vm.dashboard.third_submain.data;

                vm.dashboardState.third_submain = true;
            } else {
                console.log('Not supported!');
            }
            console.log('postData');
            console.log(vm.postData);
            console.log('dashboard');
            console.log(vm.dashboard);
        }

        function GetPreview() {
            let definition = EntitiesService.getDefinition();
            let widgetType = definition.widgetType.id;
            let widgetData = EntitiesService.getData();
            let widgetLabels =  widgetData[1];
            let widgetValues = widgetData[0];
            let render = {};

            if (widgetType === 1) {
                render.id = 'pie';
                render.class = 'chart chart-pie';
            } else if (widgetType === 2) {
                render.id = 'bar';
                render.class = 'chart chart-bar';
            } else if (widgetType === 3) {
                render.id = 'line';
                render.class = 'chart chart-line';
            }

            return {
                render: render,
                definition: definition,
                widgetType: widgetType,
                widgetData: widgetData,
                widgetLabels: widgetLabels,
                widgetValues: widgetValues
            };
        }
    }
})();
