(function() {
    'use strict';

    angular
        .module('gobhash')
        .directive('showPost', ShowPostDirective);

    ShowPostDirective.$inject = [];
    function ShowPostDirective() {
        var directive = {
            bindToController: true,
            controller: ShowPostDirectiveController,
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            templateUrl: 'html/Feed/Post/show.html',
            scope: {
                data: '=data'
            }
        };

        return directive;
        
        function link(scope, element, attrs) {
        }
    }

    angular
        .module('gobhash')
        .controller('ShowPostDirectiveController', ShowPostDirectiveController);

    ShowPostDirectiveController.$inject = ['PostService', '$cookieStore', '$timeout'];
    function ShowPostDirectiveController(PostService, $cookieStore, $timeout) {
        var vm = this;
        vm.LikePost = LikePost;
        vm.VerifyLike = VerifyLike;

        function VerifyLike() {
            return PostService.UserLikePostValidation(
                {
                    postId: vm.data._id,
                    userId: $cookieStore.get('globals').currentUser.id
                },
                function(response) {
                    console.log(response);
                    return true;
                }
            );
        }

        function LikePost() {
            PostService.LikePost(
                vm.data._id,
                function(response) {
                    if (response.success) {
                        if('msgerror' in response.response.data) {
                            console.log('Post already liked!');
                        } else {
                            vm.data.likes.push({
                                user: $cookieStore.get('globals').currentUser.id
                            });
                        }
                    } else {
                        console.log('Error not handled!');
                    }
                }
            );
        }
    }
})();
