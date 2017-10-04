(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('RecoverPasswordController', RecoverPasswordController);

    RecoverPasswordController.$inject = ['UserService', '$location', '$rootScope', '$stateParams'];
    function RecoverPasswordController(UserService, $location, $rootScope, $stateParams) {
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
            UserService.SendResetPassword($stateParams.token, vm.recover.password)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Revisa tu correo electrónico', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
