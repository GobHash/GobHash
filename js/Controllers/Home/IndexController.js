(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$http', '$state', '$scope', '$rootScope', 'AuthenticationService'];
    function IndexController($http, $state, $scope, $rootScope, AuthenticationService) {
        var vm = this;
        // var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtb3JhbGVzIiwiaWQiOiI1OWRlYWJjYWI4OGU3MjAwMzhmNTM4OGMiLCJpYXQiOjE1MDc4NjExNzAsImV4cCI6MTUxMDQ1MzE3MH0.6Z9PxplofWz0okqgilrX7k4zjReqAqEymIGa8Au7Myc';
        // $http.defaults.headers.common['Authorization'] = token;

        $scope.UpdateHeader = UpdateHeader;
        vm.actualPath = '';
        vm.stateMapping = {}
        vm.currentUser = $rootScope.globals.currentUser;
        vm.Logout = Logout;

        $scope.UpdateHeader();
        function UpdateHeader() {
            vm.actualPath = $state.$current.name;
            vm.stateMapping.feed = (vm.actualPath === 'feed');
        }

        function Logout() {
            AuthenticationService.Logout();
        }
    }

})();
