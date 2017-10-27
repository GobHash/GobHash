(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('ShowPostController', ShowPostController);

    ShowPostController.$inject = ['$cookieStore','$scope', '$stateParams', '$state', 'FeedService', 'FlashService'];
    function ShowPostController($cookieStore, $scope, $stateParams, $state, FeedService, FlashService) {
        let vm = this;
        $scope.UpdateHeader();

        vm.GetPost = GetPost;
        vm.CheckDashboardState = CheckDashboardState;
        vm.AddComment = AddComment;

        vm.postData = {};
        vm.username = $cookieStore.get('globals').currentUser.username;
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
            }

            if ('first_submain' in vm.postData.dashboard) {
                vm.dashboard.hasFirst = true;
            }

            if ('second_submain' in vm.postData.dashboard) {
                vm.dashboard.hasSecond = true;
            }

            if ('third_submain' in vm.postData.dashboard) {
                vm.dashboard.hasThird = true;
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
                        vm.postData.comments.push({
                            content: vm.new_comment,
                            user: {
                                username: vm.username
                            }
                        });
                        vm.new_comment = '';
                    } else {
                        console.log('Comentario NO agregado');
                    }
                }
            );
        }
    }
})();
