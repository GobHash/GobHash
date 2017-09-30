(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('RecoverController', RecoverController);

    RecoverController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RecoverController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.recover = {};
        vm.RecoverPassword = RecoverPassword;
        vm.emailRegex = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        function RecoverPassword() {
            vm.dataLoading = true;
            UserService.GetByUsername(vm.recover.username)
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
