(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('RecoverController', RecoverController);

    RecoverController.$inject = [
        'UserService',
        '$state',
        '$rootScope',
        'FlashService'
    ];

    function RecoverController(UserService, $state, $rootScope, FlashService) {
        var vm = this;

        vm.recover = {};
        vm.RecoverPassword = RecoverPassword;
        vm.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        function RecoverPassword() {
            vm.dataLoading = true;

            UserService.ResetPassword(vm.recover.username, vm.recover.email, function (response) {
                if (response.success) {
                    FlashService.Success('Revisa tu correo electrónico', true);
                    $state.go('login');
                } else {
                    FlashService.Error('No se pudo recuperar contraseña');
                    vm.dataLoading = false;
                }
            });
        }
    }

})();
