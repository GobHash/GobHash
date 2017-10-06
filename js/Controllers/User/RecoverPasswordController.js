(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('RecoverPasswordController', RecoverPasswordController);

    RecoverPasswordController.$inject = [
        'UserService',
        '$location',
        '$rootScope',
        '$stateParams',
        'FlashService'
    ];

    function RecoverPasswordController(UserService, $location, $rootScope, $stateParams, FlashService) {
        var vm = this;

        vm.recover = {};
        vm.RecoverPassword = RecoverPassword;
        vm.ValidateNewPassword = ValidateNewPassword;

        function ValidateNewPassword() {
            vm.dataLoading = true;
            if (vm.recover.password !== vm.recover.repassword) {
                vm.recover.password = '';
                vm.recover.repassword = '';

                vm.dataLoading = false;
                return;
            }

            vm.RecoverPassword();
        }

        function RecoverPassword() {
            UserService.SendResetPassword(
                // Data: Token and password
                $stateParams.token,
                vm.recover.password,

                function (response) {
                    if (response.success) {
                        FlashService.Success('Contraseña actualizada', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error('No se actualizó contraseña');
                        vm.dataLoading = false;
                    }
                }
            );
        }
    }

})();
