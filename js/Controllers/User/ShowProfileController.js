(function () {
    'use strict';

    angular
        .module('gobhash')
        .controller('ShowProfileController', ShowProfileController);

    ShowProfileController.$inject = ['$scope', '$rootScope', 'FlashService', 'ProfileService', '$stateParams'];
    function ShowProfileController($scope, $rootScope, FlashService, ProfileService, $stateParams) {
        var vm = this;
        $scope.UpdateHeader();

        vm.GetProfileData = GetProfileData;
        vm.FollowUser = FollowUser;

        vm.profileData = {};
        vm.profilePicture = '';
        vm.profileStats = {};

        vm.GetProfileData();

        function GetProfileData() {
            ProfileService.GetProfileById(
                $stateParams.userId,
                function(response) {
                    if (response.success) {
                        vm.profileData = response.response.data;
                        angular.element(document.querySelector('#profile-image')).css('height', '250px');
                        angular.element(document.querySelector('#profile-image')).css('width', '250px');
                    } else {
                        console.log('Usuario no encontrado!');
                    }
                }
            );

            ProfileService.GetProfileStats(
                $stateParams.userId,
                function(response) {
                    vm.profileStats = response.response.data;
                }
            );
        }

        function FollowUser() {
            console.log('FollowUser');
            ProfileService.FollowUser(
                vm.profileData.username,
                function(response) {
                    if (response.success) {
                        FlashService.Success('Usuario seguido!', true);
                    } else {
                        FlashService.Error('No se pudo seguir usuario');
                    }
                }
            );
        }
    }

})();
