(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = [
        'UserService',
        '$state',
        '$rootScope',
        'FlashService'
    ];

    function RegisterController(UserService, $state, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;
        vm.emailRegex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        function register() {
            vm.dataLoading = true;

            UserService.Create(vm.user, function (response) {
                if (response.success) {
                    FlashService.Success('Registro exitoso', true);
                    $state.go('login');
                } else {
                    FlashService.Error('No se pudo registrar usuario');
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
