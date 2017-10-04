(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    // LoginController.$inject = ['$location', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
    // function LoginController($location, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.status === 200) {
                    AuthenticationService.SetCredentials(
                        vm.username,
                        vm.password,
                        response.data.token
                    );
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
