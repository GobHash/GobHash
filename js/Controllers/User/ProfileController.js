(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$rootScope', 'FlashService', 'ProfileService', 'UserService'];
    function ProfileController($rootScope, FlashService, ProfileService, UserService) {
        var vm = this;

        vm.GetProfileData = GetProfileData;
        vm.ChangeTab = ChangeTab;
        vm.UpdateProfileData = UpdateProfileData;
        vm.ChangePassword = ChangePassword;

        vm.profileData = {};
        vm.profilePicture = '';
        vm.profileStats = {};
        vm.passwordData = {}

        // Tres tabs:
        vm.actualTab = 1;
        // 1. Información del perfil
        // 2. Cambio de contraseña
        // 3. Cambio de foto de perfil

        vm.GetProfileData();

        function GetProfileData() {
            ProfileService.GetProfile(
                function(response) {
                    vm.profileData = response.response.data;
                }
            );

            ProfileService.GetProfilePicture(
                $rootScope.globals.currentUser.id,
                function(response) {
                    vm.profilePicture = response.response.data.picture.location;
                    console.log(vm.profilePicture);
                }
            );

            ProfileService.GetProfileStats(
                $rootScope.globals.currentUser.id,
                function(response) {
                    console.log(response);
                    vm.profileStats = response.response.data;
                }
            );
        }

        function ChangeTab(tabNumber) {
            vm.actualTab = tabNumber;
        }

        function UpdateProfileData() {
            ProfileService.UpdateProfile(
                vm.profileData,
                function(response) {
                    if (response.success) {
                        FlashService.Success('Información actualizada', true);
                        vm.GetProfileData();
                    } else {
                        FlashService.Error('No se actualizó información');
                        vm.dataLoading = false;
                    }
                }
            );
        }

        function ChangePassword() {
            console.log('ChangePassword' + vm.passwordData);
        }
    }

})();
