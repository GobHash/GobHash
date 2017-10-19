(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('FeedController', FeedController);

    FeedController.$inject = ['$scope', 'FeedService', '$rootScope'];
    function FeedController($scope, FeedService, $rootScope) {
        let vm = this;
        $scope.UpdateHeader();

        // vm.ws = $websocket.$new('ws://api-dev.gobhash.com');
        // vm.ws = $websocket.$new('ws://api-dev.gobhash.com/socket.io/?EIO=3&transport=websocket');
        vm.GetPosts = GetPosts;
        vm.LiveFeed = LiveFeed2;
        vm.url = 'https://api-dev.gobhash.com'; // api url
        vm.socket = io(vm.url,
          {
          transports: ['websocket']
          }
        );

        vm.posts = [];

        vm.GetPosts();
        vm.LiveFeed();
        function LiveFeed() {
            // console.log('Authenticating ...');
            console.log('Sending token: ' + $rootScope.globals.currentUser.token);

            vm.ws.$on('$open', function () {
                console.log('Socket abierto');

                vm.ws.$emit(
                    'authenticate',
                    {
                        token: $rootScope.globals.currentUser.token
                    }
                );
            })
            .$on('authenticated', function (data) {
                console.log('authenticated');
                console.log(data);
            })
            .$on('$close', function (data) {
                console.log(data);
                console.log('Connection closed!');
            });
        }

        function LiveFeed2() {
            vm.socket.emit('authenticate', {
              token: $rootScope.globals.currentUser.token
            });
            vm.socket.on('authenticated', function(data) {
              console.log(data.auth); // true or false
            });
            vm.socket.on('update_feed', function(data) {
                console.log(data);
                vm.posts.unshift(data);
              //donde data es el post definido en el modelo Post.
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
