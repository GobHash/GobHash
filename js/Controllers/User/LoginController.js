(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('LoginController', LoginController);

    LoginController.$inject = [
        '$state',
        'AuthenticationService',
        'FlashService'
    ];

    function LoginController($state, AuthenticationService, FlashService) {
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
                            response.response.data.id,
                            vm.username,
                            vm.password,
                            response.response.data.token
                        );
                        $state.go('feed');
                    } else {
                        FlashService.Error('Usuario o contraseña incorrecta');
                        vm.dataLoading = false;
                    }
                }
            );
        };
    }

})();
