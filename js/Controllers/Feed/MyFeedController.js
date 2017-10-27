(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('MyFeedController', MyFeedController);

    MyFeedController.$inject = ['$scope', 'FeedService', '$rootScope'];
    function MyFeedController($scope, FeedService, $rootScope) {
        let vm = this;
        $scope.UpdateHeader();

        vm.GetPosts = GetPosts;

        vm.posts = [];

        vm.GetPosts();
        function GetPosts() {
            FeedService.GetUserPosts(
                $rootScope.globals.currentUser.id,
                function(response) {
                    vm.posts = response.response.data;
                }
            );
        }
    }

})();
