(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('ShowPostController', ShowPostController);

    ShowPostController.$inject = ['$rootScope','$scope', '$stateParams', '$state', 'FeedService', 'FlashService'];
    function ShowPostController($rootScope, $scope, $stateParams, $state, FeedService, FlashService) {
        let vm = this;
        $scope.UpdateHeader();

        vm.GetPost = GetPost;
        vm.CheckDashboardState = CheckDashboardState;
        vm.AddComment = AddComment;

        vm.postData = {};
        vm.username = $rootScope.globals.currentUser.username;
        vm.new_comment = '';

        vm.dashboard = {
            hasMain: false,
            hasFirst: false,
            hasSecond: false,
            hasThird: false
        }

        vm.GetPost();
        function GetPost() {
            FeedService.GetPost(
                $stateParams.postId,
                function(response) {
                    if (response.success) {
                        vm.postData = response.response.data;
                        console.log(vm.postData);
                        vm.CheckDashboardState();
                    } else {
                        console.log('Post no encontrado!');
                    }
                }
            );
        }

        function CheckDashboardState() {
            if ('main' in vm.postData.dashboard) {
                vm.dashboard.hasMain = true;
                console.log('has main graph');
            }

            if ('first_submain' in vm.postData.dashboard) {
                vm.dashboard.hasFirst = true;
                console.log('has first graph');
            }

            if ('second_submain' in vm.postData.dashboard) {
                vm.dashboard.hasSecond = true;
                console.log('has second graph');
            }

            if ('third_submain' in vm.postData.dashboard) {
                vm.dashboard.hasThird = true;
                console.log('has third graph');
            }
        }

        function AddComment() {
            FeedService.AddPostComment(
                {
                    postId: $stateParams.postId,
                    content: vm.new_comment
                },
                function(response) {
                    if (response.success) {
                        console.log('Comentario agregado');
                    } else {
                        console.log('Comentario NO agregado');
                    }
                }
            );
        }
    }
})();
