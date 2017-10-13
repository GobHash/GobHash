(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$rootScope', 'FlashService', 'ProfileService', 'AuthenticationService', 'Upload', '$timeout'];
    function ProfileController($scope, $rootScope, FlashService, ProfileService, AuthenticationService, Upload, $timeout) {
        var vm = this;

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

        vm.UploadPic = UploadPic;

        function UploadPic(file) {
            file.upload = Upload.upload({
                url: 'https://api-dev.gobhash.com/v1/users/picture',
                data: {profile: vm.newProfilePicture},
            });

            file.upload.then(function (response) {
              $timeout(function () {
                file.result = response.data;
              });
            }, function (response) {
              if (response.status > 0)
                vm.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

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
                }
            );

            ProfileService.GetProfileStats(
                $rootScope.globals.currentUser.id,
                function(response) {
                    vm.profileStats = response.response.data;
                }
            );
        }

        function ChangeTab(tabNumber) {
            vm.actualTab = tabNumber;
            if (vm.actualTab === 2 || vm.actualTab === '2') {
                angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
            }
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

            // ProfileService.UpdateProfilePicture(
            //     vm.newProfilePicture,
            //     function(response) {
            //         if (response.success) {
            //             FlashService.Success('Foto de perfil actualizada', true);
            //             vm.newProfilePicture = '';
            //         } else {
            //             FlashService.Error('La foto de perfil no se actualizó');
            //             vm.GetProfileData();
            //         }
            //     }
            // );
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

        var handleFileSelect = function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();

            reader.onload = function (evt) {
                $scope.$apply(function() {
                    vm.newProfilePicture = evt.target.result;
                });
            };

            reader.readAsDataURL(file);
        };
    }

})();
