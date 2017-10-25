(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['$scope', 'FeedService', '$rootScope'];
    function FeedController($scope, FeedService, $rootScope) {
        let vm = this;
        $scope.UpdateHeader();

        vm.GetPosts = GetPosts;
        vm.LiveFeed = LiveFeed;
        vm.url = 'https://api-dev.gobhash.com'; // api url

        // Conexión al socket para el live feed
        vm.socket = io(vm.url,
          {
          transports: ['websocket']
          }
        );

        vm.posts = [];

        vm.GetPosts();
        vm.LiveFeed();

        function LiveFeed() {
            vm.socket.emit('authenticate', {
              token: $rootScope.globals.currentUser.token
            });

            vm.socket.on('authenticated', function(data) {
              // console.log(data.auth); // true or false
            });

            vm.socket.on('update_feed', function(data) {
                $scope.$apply(function(){
                    vm.posts.unshift(data);
                });
            });

            vm.socket.on('disconnect', function () {
                io.sockets.emit('user disconnected');
            });
        }

        function GetPosts() {
            FeedService.GetPosts(
                function(response) {
                    vm.posts = response.response.data;
                }
            );
        }
    }

})();
