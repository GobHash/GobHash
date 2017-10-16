(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['$scope', 'FeedService'];
    function FeedController($scope, FeedService) {
        let vm = this;
        $scope.UpdateHeader();

        vm.GetPosts = GetPosts;

        vm.posts = [];

        vm.GetPosts();

        function GetPosts() {
            FeedService.GetPosts(
                function(response) {
                    vm.posts = response.response.data;
                    console.log(vm.posts);
                }
            );
        }
    }

})();
