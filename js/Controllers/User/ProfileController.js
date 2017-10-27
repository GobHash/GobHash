(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$cookieStore', 'FlashService', 'ProfileService', 'AuthenticationService', '$timeout'];
    function ProfileController($scope, $cookieStore, FlashService, ProfileService, AuthenticationService, $timeout) {
        var vm = this;
        $scope.UpdateHeader();

        vm.GetProfileData = GetProfileData;
        vm.ChangeTab = ChangeTab;
        vm.UpdateProfileData = UpdateProfileData;
        vm.ChangePassword = ChangePassword;
        vm.UpdateProfilePicture = UpdateProfilePicture;

        vm.profileData = {};
        vm.profilePicture = '';
        vm.newProfilePicture = '';
        vm.profileStats = {};
        vm.passwordData = {};

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
                $cookieStore.get('globals').currentUser.id,
                function(response) {
                    vm.profilePicture = response.response.data.picture.location;
                    angular.element(document.querySelector('#profile-image')).css('height', '250px');
                    angular.element(document.querySelector('#profile-image')).css('width', '250px');
                }
            );

            ProfileService.GetProfileStats(
                $cookieStore.get('globals').currentUser.id,
                function(response) {
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

        function UpdateProfilePicture() {
            vm.profilePicture = vm.newProfilePicture;
            angular.element(document.querySelector('#profile-image')).css('height', '250px');
            angular.element(document.querySelector('#profile-image')).css('width', '250px');

            ProfileService.UpdateProfilePicture(
                vm.newProfilePicture,
                function(response) {
                    if (response.success) {
                        FlashService.Success('Foto de perfil actualizada', true);
                        vm.newProfilePicture = '';
                        vm.GetProfileData();
                    } else {
                        FlashService.Error('La foto de perfil no se actualizó');
                        vm.GetProfileData();
                    }
                }
            );
        }

        function ChangePassword() {
            if (vm.passwordData.password === vm.passwordData.repassword) {
                ProfileService.UpdateProfilePassword(
                    {
                        currentPassword: vm.passwordData.currentPassword,
                        password: vm.passwordData.password
                    },
                    function(response) {
                        if (response.success) {
                            FlashService.Success('Contraseña actualizada', true);
                        } else {
                            FlashService.Error('La contraseña no se actualizó');
                        }
                    }
                );
            } else {
                FlashService.Error('Vuelva a intentarlo');
            }
        }
    }

})();
