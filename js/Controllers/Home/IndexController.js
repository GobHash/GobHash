(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$state', '$scope', '$cookieStore', 'AuthenticationService', 'ProfileService'];
    function IndexController($state, $scope, $cookieStore, AuthenticationService, ProfileService) {
        var vm = this;
        // var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtb3JhbGVzIiwiaWQiOiI1OWRlYWJjYWI4OGU3MjAwMzhmNTM4OGMiLCJpYXQiOjE1MDc4NjExNzAsImV4cCI6MTUxMDQ1MzE3MH0.6Z9PxplofWz0okqgilrX7k4zjReqAqEymIGa8Au7Myc';
        // $http.defaults.headers.common['Authorization'] = token;

        $scope.UpdateHeader = UpdateHeader;
        vm.actualPath = '';
        vm.stateMapping = {}
        vm.currentUser = $cookieStore.get('globals').currentUser;
        vm.userpicture = '';

        vm.LoadProfilePicture = LoadProfilePicture;
        vm.Logout = Logout;

        $scope.UpdateHeader();
        vm.LoadProfilePicture();

        function UpdateHeader() {
            vm.actualPath = $state.$current.name;
            vm.stateMapping.feed = (vm.actualPath === 'feed');
        }

        function Logout() {
            AuthenticationService.Logout();
        }

        function LoadProfilePicture() {
            ProfileService.GetProfilePicture(
                $cookieStore.get('globals').currentUser.id,
                function(response) {
                    vm.userpicture = response.response.data.picture.location;
                    angular.element(document.querySelector('#user-image')).css('height', '25px');
                    angular.element(document.querySelector('#user-image')).css('width', '25px');
                }
            );
        }
    }

})();
