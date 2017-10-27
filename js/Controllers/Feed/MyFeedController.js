(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('MyFeedController', MyFeedController);

    MyFeedController.$inject = ['$scope', 'FeedService', '$rootScope', '$cookieStore'];
    function MyFeedController($scope, FeedService, $rootScope, $cookieStore) {
        let vm = this;
        $scope.UpdateHeader();

        vm.GetPosts = GetPosts;

        vm.posts = [];

        vm.GetPosts();
        function GetPosts() {
            FeedService.GetUserPosts(
                $cookieStore.get('globals').currentUser.id,
                function(response) {
                    vm.posts = response.response.data;
                }
            );
        }
    }

})();
