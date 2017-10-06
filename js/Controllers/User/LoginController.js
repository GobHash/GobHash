(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('LoginController', LoginController);

    LoginController.$inject = [
        '$location',
        'AuthenticationService',
        'FlashService'
    ];

    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(
                // Data: Usuario y contraseña
                vm.username,
                vm.password,

                function (response) {
                    if (response.success) {
                        AuthenticationService.SetCredentials(
                            vm.username,
                            vm.password,
                            response.response.data.token
                        );
                        $location.path('/');
                    } else {
                        FlashService.Error('Usuario o contraseña incorrecta');
                        vm.dataLoading = false;
                    }
                }
            );
        };
    }

})();
